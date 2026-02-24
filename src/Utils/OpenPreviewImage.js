import { Dialog } from 'primereact/dialog'


const OpenPreviewImage = ({ url, preview, setPreview }) => {
    return (
        <>
            <Dialog
                visible={preview}
                style={{ width: "42rem" }}
                breakpoints={{ "960px": "75vw", "641px": "90vw" }}
                header="Preview Image"
                modal
                onHide={() => setPreview(false)}
            >
                <img
                    src={url}
                    alt='banner'
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fit",
                        borderRadius: "6px",
                    }}
                />
            </Dialog>
        </>
    )
}

export default OpenPreviewImage