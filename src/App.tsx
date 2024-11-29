import { useState, useEffect } from "react";
import "./App.css";
import { collection, addDoc } from "firebase/firestore";
import mkvid from "/mkfinal2.mp4";
import temzvid from "/temzfinal2.mp4";
import dvdvid from "/dvdfinal2.mp4";
import tjtvid from "/tjtfinal2.mp4";
import { item } from "./framerVariants.js";
import { motion } from "framer-motion";
import { db } from "./firebase.js";

function App() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  const [fontWeightMain, setFontWeightMain] = useState(800);
  const [fontWeightButton, setFontWeightButton] = useState(800);
  const [fontWeightTemz, setFontWeightTemz] = useState(800);
  const [fontWeightDvd, setFontWeightDvd] = useState(800);
  const [fontWeightMk, setFontWeightMk] = useState(800);
  const [fontWeightTjt, setFontWeightTjt] = useState(800);

  const [formData, setFormData] = useState(initialFormData);

  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState<boolean[]>([true, true, true, true]);
  const [isBlurred, setIsBlurred] = useState<string[]>(["", "", "", ""]);

  const [backgroundColor, setBackgroundColor] = useState("white");
  const [formCompleted, setFormCompleted] = useState(false);

  const handleGridItemClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
      updateMuteState(index, true);
      setBackgroundColor("white");
      setIsBlurred(["", "", "", ""]);
    } else {
      setClickedIndex(index);
      updateMuteState(index, false);
      setBackgroundColor("black");
    }
  };

  const updateMuteState = (index: number, mute: boolean) => {
    setIsMuted((prevState) => {
      const newMutedState = [...prevState];
      newMutedState[index] = mute;
      return newMutedState;
    });
  };

  const updateBlurState = (selectedIndex: number, blur: string) => {
    setIsBlurred((prevState) =>
      prevState.map((_, index) => (index !== selectedIndex ? blur : ""))
    );
  };

  const handleMouseEnter = (index: number) => {
    if (clickedIndex === index) return;
    updateMuteState(index, false);
    updateBlurState(index, "blur-md");
    setBackgroundColor("black");
  };

  const handleMouseLeave = (index: number) => {
    if (clickedIndex === index) return;
    updateMuteState(index, true);
    setBackgroundColor("white");
    updateBlurState(index, "");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    const interval = setInterval(
      () =>
        setFontWeightMain(Math.floor(Math.random() * (1000 - 300 + 1) + 300)),
      3000
    );

    const interval2 = setInterval(
      () =>
        setFontWeightMain(Math.floor(Math.random() * (1000 - 300 + 1) + 300)),
      5000
    );

    const intervaltemz = setInterval(
      () =>
        setFontWeightTemz(Math.floor(Math.random() * (1000 - 300 + 1) + 300)),
      1000
    );

    const intervaldvd = setInterval(
      () =>
        setFontWeightDvd(Math.floor(Math.random() * (1000 - 300 + 1) + 300)),
      1000
    );

    const intervalmk = setInterval(
      () => setFontWeightMk(Math.floor(Math.random() * (1000 - 300 + 1) + 300)),
      1000
    );

    const intervaltjt = setInterval(
      () =>
        setFontWeightTjt(Math.floor(Math.random() * (1000 - 300 + 1) + 300)),
      1000
    );

    const interval3 = setInterval(
      () =>
        setFontWeightButton(Math.floor(Math.random() * (1000 - 600 + 1) + 600)),
      1000
    );
    return () => {
      clearInterval(interval);
      clearInterval(interval2);
      clearInterval(interval3);

      clearInterval(intervaldvd);
      clearInterval(intervalmk);
      clearInterval(intervaltjt);
      clearInterval(intervaltemz);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), formData);
      console.log("Document written with ID: ", docRef.id);
      setBackgroundColor("black");
      setFormCompleted(true);
      setClickedIndex(null);
      setFormData(initialFormData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const validateForm = () => {
    return (
      formData.firstName.length >= 2 &&
      formData.lastName.length >= 2 &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.phoneNumber.toString().length >= 11
    );
  };

  return (
    <>
      <div
        className={`w-screen h-screen flex items-center justify-center relative ${
          formCompleted ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{
          backgroundColor,
          transition: "background-color all .5s ease",
          WebkitTransition: "all .5s ease",
          MozTransition: "all .5s ease",
        }}
      >
        <div
          className={`grid ${
            clickedIndex === null ? "grid-cols-2 grid-rows-2" : ""
          }   gap-4 mx-auto my-auto  ${
            formCompleted ? "opacity-0" : "opacity-100"
          }
          xl:h-1/2 lg:h-2/5 md:h-1/3 h-1/5
          xl:w-1/2 lg:w-1/2 sm:w-2/5 w-1/2
          `}
          style={{
            transition: "all 0.5s ease",
          }}
        >
          {[mkvid, temzvid, dvdvid, tjtvid].map((videoSrc, index) => (
            <div
              key={index}
              className={`flex items-center justify-center cursor-pointer aspect-w-16 aspect-h-9 grid-item ${
                clickedIndex === null || clickedIndex === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              } ${
                clickedIndex === index
                  ? "blur-md opacity-80 absolute inset-0"
                  : ""
              } ${isBlurred[index]}
              `}
              style={{
                transition: " filter 2s ease",
                zIndex: clickedIndex === index ? 10 : 1,
              }}
              onClick={() => handleGridItemClick(index)}
              onMouseEnter={() => {
                handleMouseEnter(index);
              }}
              onMouseLeave={() => {
                handleMouseLeave(index);
              }}
            >
              <video
                className={`${
                  clickedIndex === index ? "w-1/2 h-1/2" : "w-full h-full"
                }`}
                autoPlay
                loop
                playsInline
                controls={false}
                muted={isMuted[index]}
                style={{
                  objectFit: "contain",
                  transition: "filter 0.5s ease",
                  filter: clickedIndex === index ? "none)" : "none",
                }}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>

        {clickedIndex !== null && (
          <motion.div initial={"hidden"} animate={"show"} variants={item}>
            <div
              className={`absolute z-20 flex items-center justify-center h-full ${
                clickedIndex !== null ? "opacity-100" : "opacity-0"
              }
             sm:w-full w-10/12
            `}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 20,
              }}
            >
              <div
                className={`w-full max-w-sm ${
                  formCompleted ? "opacity-0" : "opacity-100"
                } px-2`}
              >
                <p
                  className="variable-font
                sm:text-[3.5vh] text-[2vh]
                "
                  style={{
                    color: "white",
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                    fontWeight: fontWeightMain,
                  }}
                >
                  DOWNBEAT
                </p>
                <p
                  className="variable-font
                sm:text-[3.5vh] text-[2vh]
                "
                  style={{
                    color: "white",
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                  }}
                >
                  invites you to...
                  <br />
                  <b>OpeningParty</b>
                  <br />
                  5.12.2024
                  <br />
                  bar dona
                  <br />
                  7PM-12AM
                  <br />
                  <br />
                  jazz breakbeat disco
                  <br />
                  house funk grime
                  <br />
                  ambient electronic
                  <br />
                  <br />
                  lineup
                  <br />
                </p>
                <div
                  className="w-full max-w-sm"
                  style={{
                    pointerEvents: "auto",
                  }}
                >
                  <a
                    className="variable-font-artist text-white hover:text-red-600 sm:text-[3.5vh] text-[1.6vh]"
                    style={{
                      fontWeight: fontWeightDvd,
                    }}
                    href="https://www.instagram.com/david.chen02/"
                    target="blank"
                  >
                    <span>
                      DVD <sup>↗</sup>
                    </span>
                    <br />
                  </a>
                  <a
                    className="variable-font-artist text-white hover:text-red-600 sm:text-[3.5vh] text-[1.6vh]"
                    style={{
                      fontWeight: fontWeightMk,
                    }}
                    href="https://www.instagram.com/mkprote/"
                    target="blank"
                  >
                    <span>
                      PALMREADER <sup>↗</sup>
                    </span>
                    <br />
                  </a>
                  <a
                    className="variable-font-artist text-white hover:text-red-600 sm:text-[3.5vh] text-[1.6vh]"
                    style={{
                      fontWeight: fontWeightTjt,
                    }}
                    href="https://www.instagram.com/tai.jt/"
                    target="blank"
                  >
                    <span>
                      TJT <sup>↗</sup>
                    </span>
                    <br />
                  </a>
                  <a
                    className="variable-font-artist text-white hover:text-red-600 sm:text-[3.5vh] text-[1.6vh]"
                    style={{
                      fontWeight: fontWeightTemz,
                    }}
                    href="https://www.instagram.com/419temz/"
                    target="blank"
                  >
                    <span>
                      TEMZ <sup>↗</sup>
                    </span>
                  </a>
                </div>
              </div>
              <div className={`${formCompleted ? "opacity-0" : "opacity-100"}`}>
                <p
                  className="variable-font sm:text-[3.5vh] text-[2vh]"
                  style={{
                    color: "white",
                    transition: "all .5s ease",
                    WebkitTransition: "all .5s ease",
                    MozTransition: "all .5s ease",
                    fontWeight: 700,
                  }}
                >
                  rsvp
                </p>
                <form
                  className={`w-full max-w-sm ${
                    formCompleted
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }`}
                  onSubmit={handleSubmit}
                >
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={`input-field my-3 variable-font placeholder-white
                      sm:text-[3.5vh] text-[2vh]
                      w-auto
                      
                      `}
                      style={{
                        backgroundColor: "transparent",
                        transition: "all .5s ease",
                        color: formData.firstName.length >= 2 ? "white" : "red",
                        border: "none",
                        borderBottom: `2px solid ${
                          formData.firstName.length >= 2 ? "white" : "red"
                        }`,
                        outline: "none",
                      }}
                      placeholder="first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={`input-field my-3 variable-font placeholder-white
                      sm:text-[3.5vh] text-[2vh]
                      w-auto`}
                      style={{
                        backgroundColor: "transparent",
                        transition: "all .5s ease",
                        color: formData.lastName.length >= 2 ? "white" : "red",
                        border: "none",
                        borderBottom: `2px solid ${
                          formData.lastName.length >= 2 ? "white" : "red"
                        }`,
                        outline: "none",
                      }}
                      placeholder="last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`input-field my-3 variable-font placeholder-white
                      sm:text-[3.5vh] text-[2vh]
                      w-auto`}
                      style={{
                        backgroundColor: "transparent",
                        transition: "all .5s ease",
                        color: /\S+@\S+\.\S+/.test(formData.email)
                          ? "white"
                          : "red",
                        border: "none",
                        borderBottom: `2px solid ${
                          /\S+@\S+\.\S+/.test(formData.email) ? "white" : "red"
                        }`,
                        outline: "none",
                      }}
                      placeholder="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      id="phoneNumber"
                      name="phoneNumber"
                      className={`input-field my-3 variable-font placeholder-white
                      sm:text-[3.5vh] text-[2vh]
                      w-auto`}
                      style={{
                        backgroundColor: "transparent",
                        transition: "all .5s ease",
                        color:
                          formData.phoneNumber.toString().length == 11
                            ? "white"
                            : "red",
                        border: "none",
                        borderBottom: `2px solid ${
                          formData.phoneNumber.toString().length == 11
                            ? "white"
                            : "red"
                        }`,
                        outline: "none",
                      }}
                      placeholder="phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn my-3 variable-font sm:text-[3.5vh] text-[2vh]"
                      style={{
                        transition: "all .5s ease",
                        fontWeight: fontWeightButton,
                        color: validateForm() ? "white" : "red",
                        filter: validateForm() ? "none" : "blur(5px)",
                        pointerEvents: validateForm() ? "auto" : "none",
                      }}
                      disabled={!validateForm()}
                    >
                      DEYA!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
        {formCompleted && (
          <div className="absolute flex flex-col items-center justify-center cursor-pointer pointer-events-auto">
            <a
              className="invert text-3xl mb-4 flex items-center justify-center cursor-pointer "
              onClick={() => setFormCompleted(false)}
            >
              see you soon
            </a>

            <a
              className="invert text-lg font-black flex items-center justify-center cursor-pointer animate-pulse"
              onClick={() => {
                setFormCompleted(false);
                setIsMuted([true, true, true, true]);
                setClickedIndex(null);
                setIsBlurred(["", "", "", ""]);
              }}
            >
              &#x2329;&#x2329;&#x2329;
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
