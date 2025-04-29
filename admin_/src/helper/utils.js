// upload images
export const uploadImage = async (file) => {


  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "lux_n_stay");
  //const cloudName = process.env.REACT_APP_CLOUD_NAME;
  formData.append("cloud_name", "dxx54wokj")
  const url = `http://api.cloudinary.com/v1_1/dxx54wokj/image/upload`;

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  const data = await response.json();
  return data.secure_url;
};
