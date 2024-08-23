import { useContext, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import setCanvasPreview from "./SetCanvasPreview";
import axios from "axios";
import { AuthContext } from "../../contexts/authContext";
import api from "../../api/api";
import { getLastUpdate } from "../../helpers/CalculateAge";

export default function CropImage({ setShow, animalIndex, setOneAnimal }) {
  const{data, setData, user} = useContext(AuthContext)
  const [imgSource, setImageSource] = useState("");
  const [crop, setCrop] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
const cloud_name = "dhvpteclj"


  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImageSource(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const crop = makeAspectCrop(
      {
        unit: "%", // Can be 'px' or '%'
        width: 60,
      },
      293/195.45,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <Modal show={true} size="xl" onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Form.Control type="file" onChange={onSelectFile} />
          </Modal.Title>
        </Modal.Header>
        {imgSource && (
          <Modal.Body className="d-flex flex-column align-items-center justify-items-center justify-content-center">
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              keepSelection
              minWidth={295}
              aspect={295/195.45}
            >
              <img
                ref={imgRef}
                src={imgSource}
                alt="Uploaded"
                style={{ maxHeight: "70vh" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            {crop && (
              <canvas
                className="mt-4"
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  display: "none",
                  objectFit: "contain",
                  width: "350px",
                }}
              />
            )}
          </Modal.Body>
        )}
        <Modal.Footer>
        {navigator.onLine &&<Button
            variant="success"
            onClick={async (e) => {
              e.preventDefault();
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const newPhoto = previewCanvasRef.current.toDataURL();
              const signatureResponse = await api.post("/upImg/signature", {publicIdToDelete:data.rebanho[animalIndex].imgPublicId})
              console.log(signatureResponse)
              if(signatureResponse.data.deleteSignature){
                const deletedImage  = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/destroy`, {
      public_id: data.rebanho[animalIndex].imgPublicId,
      signature: signatureResponse.data.deleteSignature,
      api_key: "492635519335433",
      timestamp: signatureResponse.data.timestamp
              })
              console.log(deletedImage)
              }

  const newData = new FormData()
  newData.append("file", newPhoto)
  newData.append("api_key", "492635519335433")
  newData.append("folder", `${data._id}`)
  newData.append("signature", signatureResponse.data.uploadSignature)
  newData.append("timestamp", signatureResponse.data.timestamp)

  const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`, newData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: function (e) {
      console.log(e.loaded / e.total)
    }
  })
  console.log(cloudinaryResponse.data)

  // send the image info back to our server
  const photoData = {
    public_id: cloudinaryResponse.data.public_id,
    version: cloudinaryResponse.data.version,
    signature: cloudinaryResponse.data.signature
  }
  let newUrl = `https://res.cloudinary.com/${cloud_name}/image/upload/q_auto/w_1200/${photoData.public_id}.png`

  let oneAnimal= data.rebanho[animalIndex]


  let changeAnimal = {
      ...oneAnimal,
      imagem_url: newUrl,
      imgPublicId:photoData.public_id,
      dadosServidor: {
        ...oneAnimal.dadosServidor,
        lastUpdate: getLastUpdate(),
      },
    };
    setOneAnimal(changeAnimal);
    try {
      let property = data
      let newData = {
        ...property,
        dadosServidor: {
          ...property.dadosServidor,
          lastUpdate: getLastUpdate(),
        },
      };
      let cowIndex = animalIndex
      newData.rebanho[cowIndex] = changeAnimal;
      await user.update(data.uuid, newData);
      setShow(false)
    } catch (e) {
      setOneAnimal(data.rebanho[animalIndex]);
      console.error(e);
    }
  }

  

            }
          >
            Enviar
          </Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}
