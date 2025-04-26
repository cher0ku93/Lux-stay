import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils";
import { createRoom, reset } from "../features/room/roomSlice";
import "./createRoom.styles.scss"
// create room
const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);

  const [files, setFiles] = useState("");
  const [formData, setFormData] = useState({
    name: "test",
    price: 200,
    desc: "dafdafadfa",
    roomNumbers: "401, 203, 232, 234",
  });

  const { name, price, desc, roomNumbers } = formData;

  const [features, setFeatures] = useState({
    wifi: false,
    airConditioning: false,
    tv: false,
    hairDryer: false,
    maxCapacity: 2,
  });

  const handleFeatureChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFeatures((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  useEffect(() => {
    if (!user) {
      // navigate to login
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle File change
  //const handleFileChange = (e) => {
    //setFiles(e.target.files);
  //};

  const handleFileChange = (e) => {
    const maxSize = 500 * 1024; // 500 Ko
    const selectedFiles = Array.from(e.target.files);
    const tooLarge = selectedFiles.some((file) => file.size > maxSize);
  
    if (tooLarge) {
      alert("Une ou plusieurs images dépassent la limite de 500 Ko. Merci d'en choisir d'autres.");
      e.target.value = ""; // reset input
      setFiles(""); // reset files state
      return;
    }
  
    setFiles(e.target.files); // sinon on les accepte
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      return;
    }

    const roomArray = roomNumbers.split(",").map((item) => {
      return {
        number: parseInt(item),
        unavailableDates: [],
      };
    });

    let list = [];
    list = await Promise.all(
      Object.values(files).map(async (file) => {
        const url = await uploadImage(file);
        return url;
      })
    );

    const dataToSubmit = {
      name,
      price,
      desc,
      roomNumbers: roomArray,
      img: list,
      features,
    };

    // dispatch createRoom function
    dispatch(createRoom(dataToSubmit));
    // let dataTosubmit = {name, price, desc, roomNumbers, img};
  };

  return (
    <div className="container">
      <h1 className="heading center">Create Room</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              onChange={handleChange}
              value={desc}
            ></textarea>
          </div>

          <div className="input-group">
            <label htmlFor="desc">Room Numbers</label>
            <textarea
              name="roomNumbers"
              onChange={handleChange}
              value={roomNumbers}
              placeholder="enter room numbers seperated by commas eg: 202, 203, 204, 400"
            ></textarea>
          </div>

          <div className="input-group">
  <label>
    <input
      type="checkbox"
      name="wifi"
      checked={features.wifi}
      onChange={handleFeatureChange}
    />
    Wi-Fi
  </label>

  <label>
    <input
      type="checkbox"
      name="airConditioning"
      checked={features.airConditioning}
      onChange={handleFeatureChange}
    />
    Air Conditioning
  </label>

  <label>
    <input
      type="checkbox"
      name="tv"
      checked={features.tv}
      onChange={handleFeatureChange}
    />
    TV
  </label>

  <label>
    <input
      type="checkbox"
      name="hairDryer"
      checked={features.hairDryer}
      onChange={handleFeatureChange}
    />
    Hair Dryer
  </label>

  <label>
    <input
      type="checkbox"
      name="breakfastIncluded"
      checked={features.breakfastIncluded}
      onChange={handleFeatureChange}
    />
    Breakfast Included
  </label>

  <label>
    <input
      type="checkbox"
      name="parking"
      checked={features.parking}
      onChange={handleFeatureChange}
    />
    Parking
  </label>

  <label>
    <input
      type="checkbox"
      name="massageSpa"
      checked={features.massageSpa}
      onChange={handleFeatureChange}
    />
    Massage Spa
  </label>

  <label>
    <input
      type="checkbox"
      name="swimmingPool"
      checked={features.swimmingPool}
      onChange={handleFeatureChange}
    />
    Swimming Pool
  </label>

  <label>
    <input
      type="checkbox"
      name="kingSizeBed"
      checked={features.kingSizeBed}
      onChange={handleFeatureChange}
    />
    King Size Bed
  </label>

  <label>
    <input
      type="checkbox"
      name="italianShower"
      checked={features.italianShower}
      onChange={handleFeatureChange}
    />
    Italian Shower
  </label>

  <label>
    <input
      type="checkbox"
      name="roomService"
      checked={features.roomService}
      onChange={handleFeatureChange}
    />
    Room Service
  </label>

  <label>
    <input
      type="checkbox"
      name="minibar"
      checked={features.minibar}
      onChange={handleFeatureChange}
    />
    Minibar
  </label>

  <label>
    Max Capacity:
    <select
      name="maxCapacity"
      value={features.maxCapacity}
      onChange={handleFeatureChange}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </label>
          </div>


          <div className="input-group">
            <label htmlFor="name">Images</label>
            <input
              type="file"
              name="file"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
