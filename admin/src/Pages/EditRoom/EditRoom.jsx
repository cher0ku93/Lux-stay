import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRoom, reset } from "../../features/room/roomSlice";
import { useSelector, useDispatch } from "react-redux";

const EditRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.room);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${id}`);
        if (res.ok) {
          const data = await res.json();

          const roomNumbersString = data.roomNumbers
            ?.map((item) => item.number)
            .join(",") || "";

          setFormData({
            name: data.name || "",
            price: data.price || "",
            desc: data.desc || "",
            roomNumbers: roomNumbersString,
            features: {
              wifi: data.features?.wifi || false,
              airConditioning: data.features?.airConditioning || false,
              tv: data.features?.tv || false,
              hairDryer: data.features?.hairDryer || false,
              maxCapacity: data.features?.maxCapacity || 2,
              breakfastIncluded: data.features?.breakfastIncluded || false,
              parking: data.features?.parking || false,
              massageSpa: data.features?.massageSpa || false,
              swimmingPool: data.features?.swimmingPool || false,
              kingSizeBed: data.features?.kingSizeBed || false,
              italianShower: data.features?.italianShower || false,
              roomService: data.features?.roomService || false,
              minibar: data.features?.minibar || false,
            },
          });
          setLoading(false);
        } else {
          console.error("Erreur lors de la récupération des données");
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur:", error.message);
        setLoading(false);
      }
    };

    getRoom();
  }, [id]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.features) {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const roomArray = formData.roomNumbers.split(",").map((item) => ({
      number: parseInt(item.trim()),
      unavailableDates: [],
    }));

    const dataToSubmit = {
      name: formData.name,
      price: formData.price,
      desc: formData.desc,
      roomNumbers: roomArray,
      features: formData.features,
      roomId: id,
    };

    console.log("Updating Room:", dataToSubmit);
    dispatch(updateRoom(dataToSubmit));
  };

  if (loading || !formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1 className="heading center">Edit Room</h1>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Prix */}
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="input-group">
            <label htmlFor="desc">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Numéros de chambre */}
          <div className="input-group">
            <label htmlFor="roomNumbers">Room Numbers</label>
            <textarea
              name="roomNumbers"
              value={formData.roomNumbers}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Features */}
          <div className="input-group">
            <label>Features</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="wifi"
                  checked={formData.features.wifi}
                  onChange={handleChange}
                />
                Wi-Fi
              </label>
              <label>
                <input
                  type="checkbox"
                  name="airConditioning"
                  checked={formData.features.airConditioning}
                  onChange={handleChange}
                />
                Air Conditioning
              </label>
              <label>
                <input
                  type="checkbox"
                  name="tv"
                  checked={formData.features.tv}
                  onChange={handleChange}
                />
                TV
              </label>
              <label>
                <input
                  type="checkbox"
                  name="hairDryer"
                  checked={formData.features.hairDryer}
                  onChange={handleChange}
                />
                Hair Dryer
              </label>
              <label>
                <input
                  type="checkbox"
                  name="breakfastIncluded"
                  checked={formData.features.breakfastIncluded}
                  onChange={handleChange}
                />
                Breakfast Included
              </label>
              <label>
                <input
                  type="checkbox"
                  name="parking"
                  checked={formData.features.parking}
                  onChange={handleChange}
                />
                Parking
              </label>
              <label>
                <input
                  type="checkbox"
                  name="massageSpa"
                  checked={formData.features.massageSpa}
                  onChange={handleChange}
                />
                Massage Spa
              </label>
              <label>
                <input
                  type="checkbox"
                  name="swimmingPool"
                  checked={formData.features.swimmingPool}
                  onChange={handleChange}
                />
                Swimming Pool
              </label>
              <label>
                <input
                  type="checkbox"
                  name="kingSizeBed"
                  checked={formData.features.kingSizeBed}
                  onChange={handleChange}
                />
                King Size Bed
              </label>
              <label>
                <input
                  type="checkbox"
                  name="italianShower"
                  checked={formData.features.italianShower}
                  onChange={handleChange}
                />
                Italian Shower
              </label>
              <label>
                <input
                  type="checkbox"
                  name="roomService"
                  checked={formData.features.roomService}
                  onChange={handleChange}
                />
                Room Service
              </label>
              <label>
                <input
                  type="checkbox"
                  name="minibar"
                  checked={formData.features.minibar}
                  onChange={handleChange}
                />
                Minibar
              </label>
              <label>
                Max Capacity:
                <input
                  type="number"
                  name="maxCapacity"
                  value={formData.features.maxCapacity}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          <button type="submit">Update Room</button>
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
