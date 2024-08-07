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
			src: "/src/assets/brazil.jpg",
			text: "Rio de Janeiro, Brazil",
			camera: "Sony Alpha 7 II",
		},
		{
			src: "/src/assets/canyan.jpg",
			text: "Grand Canyon, USA",
			camera: "Canon EOS 90D",
		},
		{
			src: "/src/assets/canada.jpg",
			text: "Banff National Park, Canada",
			camera: "Nikon D7200",
		},
		{
			src: "/src/assets/borabora.jpg",
			text: "Bora Bora, French Polynesia",
			camera: "Fujifilm X-T3",
		},
		{
			src: "/src/assets/uluru.jpg",
			text: "Uluru, Australia",
			camera: "Sony Alpha 7R III",
		},
		{
			src: "/src/assets/capetown.jpg",
			text: "Cape Town, South Africa",
			camera: "Canon EOS 5DS R",
		},
		{
			src: "/src/assets/antelope.jpg",
			text: "Antelope Canyon, USA",
			camera: "Nikon Z7",
		},
		{
			src: "/src/assets/patagonia.jpg",
			text: "Patagonia, Argentina",
			camera: "Sony Alpha 7S II",
		},
		{
			src: "/src/assets/italy.jpg",
			text: "Cinque Terre, Italy",
			camera: "Canon EOS 80D",
		},
		{
			src: "/src/assets/bolivia.jpg",
			text: "Salar de Uyuni, Bolivia",
			camera: "Nikon D810",
		},
		{
			src: "/src/assets/amalfi.jpg",
			text: "Amalfi Coast, Italy",
			camera: "Sony Alpha 7R II",
		},
		{
			src: "/src/assets/kruger.jpg",
			text: "Kruger National Park, South Africa",
			camera: "Canon EOS 7D Mark II",
		},
		{
			src: "/src/assets/croatia.jpg",
			text: "Dubrovnik, Croatia",
			camera: "Nikon D5600",
		},
		{
			src: "/src/assets/zion.jpg",
			text: "Zion National Park, USA",
			camera: "Fujifilm X-T30",
		},
		{
			src: "/src/assets/grandcanyon.jpg",
			text: "Grand Canyon, USA",
			camera: "Canon EOS 90D",
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
