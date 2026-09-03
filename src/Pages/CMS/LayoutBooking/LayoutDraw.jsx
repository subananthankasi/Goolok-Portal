import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import {
    FiZoomIn, FiZoomOut, FiRefreshCw, FiEdit3,
    FiCornerUpLeft, FiCornerUpRight, FiX, FiSave, FiTrash2, FiUploadCloud
} from 'react-icons/fi'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import './LayoutDraw.css'
import axios from 'axios'
import API_BASE_URL from '../../../Api/api'
import { useParams } from 'react-router-dom'
import { decryptData } from '../../../Utils/encrypt'
import { message, Select } from 'antd';
import { SelectPicker } from 'rsuite';
import Toast from '../../../Utils/Toast'
import { ThreeDots } from 'react-loader-spinner'

const LayoutDraw = () => {
    const { eid } = useParams()
    const decryEid = decryptData(eid)
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const fileInputRef = useRef(null)
    const imageRef = useRef(null)

    const [imageSrc, setImageSrc] = useState(null)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
    const [scale, setScale] = useState(1)

    const [isDrawing, setIsDrawing] = useState(false)
    const [currentPoints, setCurrentPoints] = useState([])
    const [plots, setPlots] = useState([])
    const [history, setHistory] = useState([])
    const [redoStack, setRedoStack] = useState([])
    const [hoverPoint, setHoverPoint] = useState(null)

    const CLOSE_THRESHOLD = 10
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    const [plotNo, setPlotNo] = useState([])

    // ---------- Plot-number assignment modal ----------
    const [showPlotModal, setShowPlotModal] = useState(false)
    const [pendingPoints, setPendingPoints] = useState([]) // closed shape, waiting for user to click "Save Plot"
    const [selectedPlotNo, setSelectedPlotNo] = useState(null)

    const fetchPlotNo = async (id) => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_BASE_URL}/fetchplotno/${id}`)
            setPlotNo(response.data?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (decryEid) {
            fetchPlotNo(decryEid)
        }
    }, [decryEid])

    // plot numbers not yet used on this layout
    const plotNoOptions = useMemo(() => {
        const all = plotNo?.data || []
        const usedIds = plots.map(p => p.plotId)
        return all
            .filter(item => !usedIds.includes(item.id))
            .map(item => ({ label: item.plot_no ?? item.plotNo ?? String(item.id), value: item.id, raw: item }))
    }, [plotNo, plots])

    // ---------- Upload ----------
    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        // if (file.size > 2 * 1024 * 1024) {
        //     alert('Please upload a file smaller than 2 MB.')
        //     return
        // }

        const reader = new FileReader()
        reader.onload = (ev) => {
            const img = new Image()
            img.onload = () => {
                imageRef.current = img
                setImageSize({ width: img.width, height: img.height })
                setImageSrc(ev.target.result)
                setPlots([])
                setCurrentPoints([])
                setPendingPoints([])
                setHistory([])
                setRedoStack([])
                setIsDrawing(false)
                setScale(1)
            }
            img.src = ev.target.result
        }
        reader.readAsDataURL(file)
    }

    // ---------- Canvas drawing ----------
    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || !imageRef.current) return
        const ctx = canvas.getContext('2d')

        canvas.width = imageSize.width
        canvas.height = imageSize.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(imageRef.current, 0, 0, imageSize.width, imageSize.height)

        // already-saved plots (labeled)
        plots.forEach((plot) => {
            drawPolygon(ctx, plot.points, true, plot.color)
            const cx = plot.points.reduce((s, p) => s + p.x, 0) / plot.points.length
            const cy = plot.points.reduce((s, p) => s + p.y, 0) / plot.points.length
            ctx.fillStyle = '#1b334b'
            ctx.font = 'bold 16px Poppins, sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText(plot.label, cx, cy)
        })

        // shape that is closed but not yet assigned a plot number
        if (pendingPoints.length > 0) {
            drawPolygon(ctx, pendingPoints, true, '#c9952a')
            pendingPoints.forEach((p) => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
                ctx.fillStyle = '#c9952a'
                ctx.fill()
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 1
                ctx.stroke()
            })
        }

        // shape currently being drawn
        if (currentPoints.length > 0) {
            drawPolygon(ctx, currentPoints, false, '#c9952a')

            currentPoints.forEach((p, i) => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
                ctx.fillStyle = i === 0 ? '#e74c3c' : '#c9952a'
                ctx.fill()
                ctx.strokeStyle = '#fff'
                ctx.lineWidth = 1
                ctx.stroke()
            })

            if (hoverPoint) {
                const last = currentPoints[currentPoints.length - 1]
                ctx.beginPath()
                ctx.moveTo(last.x, last.y)
                ctx.lineTo(hoverPoint.x, hoverPoint.y)
                ctx.strokeStyle = '#c9952a'
                ctx.lineWidth = 2
                ctx.setLineDash([5, 4])
                ctx.stroke()
                ctx.setLineDash([])
            }
        }
    }, [imageSize, plots, currentPoints, hoverPoint, pendingPoints])

    const drawPolygon = (ctx, points, closed, color) => {
        if (points.length < 2) return
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        points.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
        if (closed) ctx.closePath()

        ctx.fillStyle = hexToRgba(color, 0.25)
        if (closed) ctx.fill()

        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
    }

    const hexToRgba = (hex, alpha) => {
        const c = hex.replace('#', '')
        const r = parseInt(c.substring(0, 2), 16)
        const g = parseInt(c.substring(2, 4), 16)
        const b = parseInt(c.substring(4, 6), 16)
        return `rgba(${r},${g},${b},${alpha})`
    }

    useEffect(() => { draw() }, [draw])

    // ---------- Pointer helpers ----------
    const getCanvasPoint = (e) => {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * canvas.width
        const y = ((e.clientY - rect.top) / rect.height) * canvas.height
        return { x, y }
    }

    const handleCanvasClick = (e) => {
        if (!isDrawing) return
        const point = getCanvasPoint(e)

        if (currentPoints.length >= 3) {
            const first = currentPoints[0]
            const dist = Math.hypot(point.x - first.x, point.y - first.y)
            if (dist <= CLOSE_THRESHOLD / scale) {
                closeShape()
                return
            }
        }

        setHistory(h => [...h, currentPoints])
        setRedoStack([])
        setCurrentPoints(pts => [...pts, point])
    }

    const handleCanvasMouseMove = (e) => {
        if (!isDrawing || currentPoints.length === 0) return
        setHoverPoint(getCanvasPoint(e))
    }

    const handleCanvasDoubleClick = () => {
        if (isDrawing && currentPoints.length >= 3) closeShape()
    }

    // ---------- Plot lifecycle ----------
    const startDrawing = () => {
        if (!imageSrc) return
        if (pendingPoints.length > 0) return 
        setIsDrawing(true)
        setCurrentPoints([])
        setHistory([])
        setRedoStack([])
    }

    // polygon closed on canvas -> just park it, do NOT open the modal yet
    const closeShape = () => {
        setPendingPoints(currentPoints)
        setCurrentPoints([])
        setHistory([])
        setRedoStack([])
        setIsDrawing(false)
        setHoverPoint(null)
    }

    // called by the "Save Plot" button that appears once a shape is closed
    const openPlotNumberModal = () => {
        if (pendingPoints.length < 3) return
        setSelectedPlotNo(null)
        setShowPlotModal(true)
    }

    // discard the closed shape without assigning a plot number
    const discardPendingShape = () => {
        setPendingPoints([])
        setSelectedPlotNo(null)
    }

    //  const confirmPlotNumber = () => {
    //     if (!selectedPlotNo) return;

    //     const colors = [
    //         '#c9952a',
    //         '#1b334b',
    //         '#27ae60',
    //         '#8e44ad',
    //         '#e67e22',
    //         '#2980b9'
    //     ];

    //     const color = colors[plots.length % colors.length];
    //     setPlots(prev => [
    //         ...prev,
    //         {
    //             points: pendingPoints,
    //             plotId: selectedPlotNo,
    //             label: selectedPlotNo,   
    //             color
    //         }
    //     ]);

    //     setPendingPoints([]);
    //     setSelectedPlotNo(null);
    //     setShowPlotModal(false);
    // };

    // closing the modal (X / backdrop / cancel) just hides it, keeps the shape pending


        const plotOptions =
        (plotNo?.data || plotNo || []).map((item) => (
            {
                lable: item.plot_no,
                value: item.id
            }
        ))

    const selectedPlot = plotOptions?.find(
        item => Number(item?.value) === Number(selectedPlotNo)
    );
    const val = plotOptions.map((item)=>(
       Number(item.value) 
    ))

    const confirmPlotNumber = () => {
        if (!selectedPlotNo) return;
        const colors = [
            '#c9952a', //yellow
            '#1b334b', //black
            '#27ae60', //green
            '#8e44ad',
            '#e67e22',
            '#2980b9'
        ];

        const color = colors[plots.length % colors.length];

        setPlots(prev => [
            ...prev,
            {
                points: pendingPoints,
                // plotId: selectedPlotNo,  
                // label: selectedPlotNo,  
                plotId: selectedPlot?.value,        
                label: selectedPlot?.lable,     
                color
            }
        ]);

        setPendingPoints([]);
        setShowPlotModal(false);


    }

    const cancelPlotNumber = () => {
        setSelectedPlotNo(null)
        setShowPlotModal(false)
    }

    const cancelDrawing = () => {
        setCurrentPoints([])
        setHistory([])
        setRedoStack([])
        setIsDrawing(false)
        setHoverPoint(null)
    }

    const undo = () => {
        if (currentPoints.length === 0) {
            if (plots.length > 0) {
                setPlots(prev => prev.slice(0, -1))
            }
            return
        }
        const prev = history[history.length - 1] ?? []
        setRedoStack(r => [...r, currentPoints])
        setHistory(h => h.slice(0, -1))
        setCurrentPoints(prev)
    }

    const redo = () => {
        if (redoStack.length === 0) return
        const next = redoStack[redoStack.length - 1]
        setHistory(h => [...h, currentPoints])
        setRedoStack(r => r.slice(0, -1))
        setCurrentPoints(next)
    }

    const deletePlot = (idx) => {
        setPlots(prev => prev.filter((_, i) => i !== idx))
    }

    const resetAll = () => {
        setPlots([])
        setCurrentPoints([])
        setPendingPoints([])
        setHistory([])
        setRedoStack([])
        setIsDrawing(false)
        setScale(1)
    }

    const zoomIn = () => setScale(s => Math.min(s + 0.2, 3))
    const zoomOut = () => setScale(s => Math.max(s - 0.2, 0.4))
    const zoomReset = () => setScale(1)

    // ---------- Save plot data only (no image) ----------
    const savePlot = async () => {
        if (plots.length === 0) return
        setSaving(true)
        try {
            const payload = {
                projectId: decryEid,
                imageWidth: imageSize.width,
                imageHeight: imageSize.height,
                plots: plots.map(p => ({ plotId: p.plotId, label: p.label, points: p.points }))
            }
            await axios.post(`${API_BASE_URL}/savelayoutplots`, payload)
            alert(`Saved ${plots.length} plot section(s).`)
        } catch (error) {
            alert('Failed to save plot data.')
        } finally {
            setSaving(false)
        }
    }

    // ---------- Save project: send the drawn (rendered) image + plot data ----------
    const saveProject = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        setSaving(true)
        canvas.toBlob(async (blob) => {
            try {
                const formData = new FormData()
                formData.append('enqid', decryEid)
                formData.append('plotno', selectedPlotNo)
                formData.append('image', blob, `layout-${decryEid}.png`)
                formData.append(
                    'plotaxis',
                    JSON.stringify(
                        plots.map(p => ({ plotId: p.plotId, label: p.label, points: p.points }))
                    )
                )
                // formData.append('imageWidth', imageSize.width)
                // formData.append('imageHeight', imageSize.height)
                for (const [key, value] of formData.entries()) {
                    // console.log(key, value);
                }
                await axios.post(`${API_BASE_URL}/drawlayoutbooking`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
                Toast({ message: "Project saved successfully", type: "success" });
            } catch (error) {
                Toast({ message: "Failed to save project", type: "error" });
            } finally {
                setSaving(false)
            }
        }, 'image/png')
    }


    return (
        <section className="section">
            <div className="container">
                <div className="p-3">
                    <div className="card p-3">
                        <div className="card-header">
                            <h6>Layout Booking</h6>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="" className="form-label">Upload Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="form-control mt-1 layout-upload-input"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* <div className="mt-3">
                                <h6 className="mb-3">* Image upload Guidlines *</h6>
                                <p className="layout-guideline-text">The plot layout image should be in black and white color format only.</p>
                                <p className="layout-guideline-text">Resolution: 1024 px × 1536 px.</p>
                                <p className="layout-guideline-text">Please upload a file smaller than 2 MB.</p>
                            </div> */}

                            {imageSrc && (
                                <div className="mt-3">
                                    <div className="layout-toolbar">
                                        <div className="layout-toolbar-group">
                                            <button type="button" className="layout-tool-btn" onClick={zoomIn} title="Zoom In">
                                                <FiZoomIn />
                                            </button>
                                            <button type="button" className="layout-tool-btn" onClick={zoomOut} title="Zoom Out">
                                                <FiZoomOut />
                                            </button>
                                            <button type="button" className="layout-tool-btn" onClick={zoomReset} title="Reset Zoom">
                                                <FiRefreshCw />
                                            </button>
                                            <span className="layout-zoom-label">{Math.round(scale * 100)}%</span>
                                        </div>

                                        <div className="layout-toolbar-group">
                                            {!isDrawing ? (
                                                <button
                                                    type="button"
                                                    className="layout-tool-btn primary"
                                                    onClick={startDrawing}
                                                    disabled={pendingPoints.length > 0}
                                                    title={pendingPoints.length > 0 ? 'Save or discard the current shape first' : ''}
                                                >
                                                    <FiEdit3 className="me-1" /> Start Drawing
                                                </button>
                                            ) : (
                                                <>
                                                    <button type="button" className="layout-tool-btn" onClick={undo} title="Undo">
                                                        <FiCornerUpLeft />
                                                    </button>
                                                    <button type="button" className="layout-tool-btn" onClick={redo} title="Redo" disabled={redoStack.length === 0}>
                                                        <FiCornerUpRight />
                                                    </button>
                                                    <button type="button" className="layout-tool-btn danger" onClick={cancelDrawing} title="Cancel Drawing">
                                                        <FiX className="me-1" /> Cancel
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* shows only once a shape has been closed and is waiting to be saved */}
                                        {pendingPoints.length > 0 && (
                                            <div className="layout-toolbar-group">
                                                <button type="button" className="layout-tool-btn success" onClick={openPlotNumberModal}>
                                                    <FiSave className="me-1" /> Save Plot
                                                </button>
                                                <button type="button" className="layout-tool-btn danger" onClick={discardPendingShape} title="Discard this shape">
                                                    <FiX className="me-1" /> Discard
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {isDrawing && (
                                        <div className="layout-draw-hint">
                                            Click on the image to mark plot corners. Click the first (red) point again, or double-click, to close the section.
                                        </div>
                                    )}

                                    {pendingPoints.length > 0 && (
                                        <div className="layout-draw-hint">
                                            Section closed. Click <strong>Save Plot</strong> to assign a plot number, or <strong>Discard</strong> to redo it.
                                        </div>
                                    )}
                                    {plots.length > 0 && (
                                        <div className="layout-plot-list mt-3 card p-3 mb-3">
                                            <h6 className="mb-2">Marked Sections</h6>
                                            {plots.map((plot, idx) => (
                                                <div className="layout-plot-chip" key={idx}>
                                                    <span className="layout-plot-swatch" style={{ backgroundColor: plot.color }} />
                                                    <span>{plot.label}</span>
                                                    <button
                                                        type="button"
                                                        className="layout-plot-delete"
                                                        onClick={() => deletePlot(idx)}
                                                        title="Remove section"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Row 1: submit all marked plots */}
                                            <div className="layout-bottom-actions mt-3 mb-2 d-flex gap-2 justify-content-end">
                                                <button type="button" className="layout-tool-btn danger small" onClick={resetAll}>
                                                    Reset All
                                                </button>
                                                {/* <button
                                                    type="button"
                                                    className="layout-tool-btn success"
                                                    onClick={savePlot}
                                                    disabled={saving}
                                                >
                                                    <FiSave className="me-1" /> Submit Plots
                                                </button> */}
                                                {/* <div className="layout-bottom-actions mt-2"> */}
                                                <button
                                                    type="button"
                                                    className="layout-tool-btn primary"
                                                    onClick={saveProject}
                                                    disabled={saving}
                                                >
                                                    {saving ? (
                                                        <ThreeDots
                                                            visible={true}
                                                            height="20"
                                                            width="45"
                                                            color="#ffffff"
                                                            radius="18"
                                                            ariaLabel="three-dots-loading"
                                                            wrapperStyle={{
                                                                justifyContent: "center",
                                                                fontSize: "12px",
                                                            }}
                                                            wrapperClass=""
                                                        />
                                                    ) : (<>   <FiUploadCloud className="me-1" /><span>Save Project </span> </>)}

                                                </button>
                                                {/* </div> */}
                                            </div>

                                            {/* Row 2: save the whole project (image + plots) */}
                                            {/* <div className="layout-bottom-actions mt-2">
                                                <button
                                                    type="button"
                                                    className="layout-tool-btn primary"
                                                    onClick={saveProject}
                                                    disabled={saving}
                                                >
                                                    <FiUploadCloud className="me-1" /> Save Project
                                                </button>
                                            </div> */}
                                        </div>
                                    )}

                                    <div className="layout-canvas-wrapper" ref={containerRef}>
                                        <div
                                            className="layout-canvas-scale"
                                            style={{ '--layout-scale': scale }}
                                        >
                                            <canvas
                                                ref={canvasRef}
                                                className={`layout-canvas ${isDrawing ? 'is-drawing' : ''}`}
                                                onClick={handleCanvasClick}
                                                onMouseMove={handleCanvasMouseMove}
                                                onDoubleClick={handleCanvasDoubleClick}
                                            />
                                        </div>
                                    </div>

                                    {/* {plots.length > 0 && (
                                        <div className="layout-plot-list mt-3">
                                            <h6 className="mb-2">Marked Sections</h6>
                                            {plots.map((plot, idx) => (
                                                <div className="layout-plot-chip" key={idx}>
                                                    <span className="layout-plot-swatch" style={{ backgroundColor: plot.color }} />
                                                    <span>{plot.label}</span>
                                                    <button
                                                        type="button"
                                                        className="layout-plot-delete"
                                                        onClick={() => deletePlot(idx)}
                                                        title="Remove section"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            ))}

                                 
                                            <div className="layout-bottom-actions mt-3">
                                                <button type="button" className="layout-tool-btn danger small" onClick={resetAll}>
                                                    Reset All
                                                </button>
                                                <button
                                                    type="button"
                                                    className="layout-tool-btn success"
                                                    onClick={savePlot}
                                                    disabled={saving}
                                                >
                                                    <FiSave className="me-1" /> Submit Plots
                                                </button>
                                            </div>

                                         
                                            <div className="layout-bottom-actions mt-2">
                                                <button
                                                    type="button"
                                                    className="layout-tool-btn primary"
                                                    onClick={saveProject}
                                                    disabled={saving}
                                                >
                                                    <FiUploadCloud className="me-1" /> Save Project
                                                </button>
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Plot number assignment modal - opens only from the "Save Plot" button */}
            <Dialog
                header="Plot Number"
                modal
                visible={showPlotModal}
                style={{ width: '380px' }}
                onHide={cancelPlotNumber}
            >
                <div className="form-group mb-2">
                    <div className="form-label">Select Plot No :</div>
                    <select className="form-select" value={selectedPlotNo || ''} onChange={(e) => setSelectedPlotNo(e.target.value)}>
                        <option value="">Select Plot No</option>
                        {plotOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.lable}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button
                        type="button"
                        className="btn1"
                        onClick={confirmPlotNumber}
                        disabled={saving || !selectedPlotNo}
                    >
                        {saving ? (<ThreeDots
                            visible={true}
                            height="20"
                            width="45"
                            color="#ffffff"
                            radius="18"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{
                                justifyContent: "center",
                                fontSize: "12px",
                            }}
                            wrapperClass=""
                        />) : (<>  <FiSave className="me-1" /> <span>Save Plot Number </span> </>)}

                    </button>
                </div>
            </Dialog>
        </section>
    )
}

export default LayoutDraw