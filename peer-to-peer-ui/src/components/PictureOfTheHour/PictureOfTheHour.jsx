import React, { useState, useEffect } from "react";
import "./PictureOfTheHour.css";

const PictureOfTheHour = () => {
	const images = [
		{
			src: "/src/assets/kyoto.jpg",
			text: "Kyoto, Japan",
			camera: "Fujifilm X-T4",
		},
		{
			src: "/src/assets/machu.jpg",
			text: "Machu Picchu, Peru",
			camera: "Sony Alpha 7R IV",
		},
		{
			src: "/src/assets/moraine.jpg",
			text: "Moraine Lake, Canada",
			camera: "Nikon D850",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite, California",
			camera: "NIKON COOLPIX W150",
		},
		{
			src: "/src/assets/santorini.jpg",
			text: "Santorini, Greece",
			camera: "Canon EOS 5D Mark IV",
		},
		{
			src: "/src/assets/petra.jpg",
			text: "Petra, Jordan",
			camera: "Canon EOS R5",
		},
		{
			src: "/src/assets/venice.jpg",
			text: "Venice, Italy",
			camera: "Nikon Z6",
		},
		{
			src: "/src/assets/taj.jpg",
			text: "Taj Mahal, India",
			camera: "Canon EOS 6D Mark II",
		},
		{
			src: "/src/assets/iceland.jpg",
			text: "Iceland",
			camera: "Nikon D750",
		},
		{
			src: "/src/assets/brazil,jpg",
			text: "Rio de Janeiro, Brazil",
			camera: "Sony Alpha 7 II",
		},
		{
			src: "/src/assets/canyan.jpg",
			text: "Grand Canyon, USA",
			camera: "Canon EOS 90D",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "NIKON COOLPIX W150",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "NIKON COOLPIX W150",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "NIKON COOLPIX W150",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "Nikon Digicam",
		},
		{
			src: "/src/assets/yosemite.JPG",
			text: "Yosemite",
			camera: "NIKON COOLPIX W150",
		},
	];

	const getCurrentHour = () => new Date().getHours();

	const [hourlyContent, setHourlyContent] = useState(
		images[getCurrentHour() % images.length]
	);

	useEffect(() => {
		const updateContent = () => {
			setHourlyContent(images[getCurrentHour() % images.length]);
		};

		const intervalId = setInterval(updateContent, 3600000);

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, [images]);

	return (
		<div className="picture-of-the-hour">
			<div className="picture-container">
				<h2>Picture of the Hour</h2>
				<img
					src={hourlyContent.src}
					alt={hourlyContent.text}
					className="hourly-image"
				/>
			</div>
			<div className="picture-text">
				<h3>{hourlyContent.text}</h3>
				<p>Camera: {hourlyContent.camera}</p>
			</div>
		</div>
	);
};

export default PictureOfTheHour;
