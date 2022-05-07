import fetch from "node-fetch";

async function createArrayFromImage(image){
    const response = await fetch(url_image);
    const arrayBuffer = await response.arrayBuffer();
    const DataView = new Uint8Array(arrayBuffer);
    return DataView
}

async function UrlValidator(url) {
    try {
      const image = await fetch(url);
      if (!res.ok) {
        throw new Error("BAD REQUEST - Verify the URL or File");
      }
      return image;
    } catch (error) {
      throw new Error(error);
    }
  }
  

async function load(urlOrFile) {
  
    const load = async() =>{
        const response = await UrlValidator(urlOrFile);
        const DataView = await createArrayFromImage(response)
        return DataView
    }
  
    return load()
  }

export default load
