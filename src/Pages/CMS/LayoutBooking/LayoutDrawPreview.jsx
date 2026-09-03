import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import API_BASE_URL, { IMG_PATH } from '../../../Api/api'
import axios from 'axios'
import { decryptData } from '../../../Utils/encrypt'
import './LayoutDraw.css'

// adjust this if your images are served from a different folder/host
const IMAGE_BASE_URL = `${IMG_PATH}/cms/drawlayoutbooking`

const LayoutDrawPreview = () => {
    const { eid, id, status } = useParams()
    const decryEid = decryptData(eid)

    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const containerRef = useRef(null)

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${API_BASE_URL}/drawlayoutbooking/${decryEid}`)
                if (response.data) {
                    setData(response.data.data)
                } else {
                    setError(true)
                }
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [decryEid])

    // load the layout image once we have the data
    useEffect(() => {
        if (!data?.layoutimage) return
        const img = new Image()
        img.onload = () => {
            imageRef.current = img
            setImageSize({ width: img.width, height: img.height })
        }
        // img.onerror = () => setError(true)
        img.onerror = (e) => {
            setError(true);
        };
        img.src = `${IMAGE_BASE_URL}/${data.layoutimage}`
    }, [data])

    // draw image + red plot outlines
    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas || !imageRef.current) return
        const ctx = canvas.getContext('2d')
        canvas.width = imageSize.width
        canvas.height = imageSize.height

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(imageRef.current, 0, 0, imageSize.width, imageSize.height)

        const plots = data?.plotaxis || []

        plots.forEach((plot) => {
            const points = plot.points || []
            if (points.length < 2) return

            ctx.beginPath()
            ctx.moveTo(points[0].x, points[0].y)
            points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y))
            ctx.closePath()

            // ctx.fillStyle = 'rgba(231, 76, 60, 0.35)'  
            ctx.fillStyle = 'rgba(46, 204, 113, 0.35)' // green fill
            ctx.fill()

            // ctx.strokeStyle = '#e74c3c'                 
            ctx.strokeStyle = '#27ae60' // green outline
            ctx.lineWidth = 3
            ctx.stroke()

            const cx = points.reduce((s, p) => s + p.x, 0) / points.length
            const cy = points.reduce((s, p) => s + p.y, 0) / points.length
            ctx.fillStyle = '#ffffff'
            ctx.font = 'bold 16px Poppins, sans-serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(plot.label ?? plot.plotId, cx, cy)
        })
    }, [data, imageSize])

    useEffect(() => { draw() }, [draw])

    return (
        <section className="section">
            <div className="container">
                <div className="p-3">
                    <div className="card p-3 mb-3">
                        <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0">Layout Booking</h6>
                            <div className="d-flex align-items-center gap-3">
                                <span className="layout-legend-item">
                                    <span className="layout-legend-dot" style={{ backgroundColor: '#27ae60' }} />
                                    Vacant / Vacant()
                                </span>
                                <span className="layout-legend-item">
                                    <span className="layout-legend-dot" style={{ backgroundColor: '#e74c3c' }} />
                                    Blocked / Booked
                                </span>
                                <span className="layout-legend-item">
                                    <span className="layout-legend-dot" style={{ backgroundColor: '#95a5a6' }} />
                                    All other
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card p-3">
                        <div className="card-body">
                            {loading && (
                                <div className="text-center py-5">Loading layout...</div>
                            )}

                            {!loading && error && (
                                <div className="text-center text-danger py-5">
                                    Failed to load layout preview.
                                </div>
                            )}

                            {!loading && !error && data && (
                                <div className="layout-canvas-wrapper" ref={containerRef}>
                                    <canvas ref={canvasRef} className="layout-canvas" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LayoutDrawPreview