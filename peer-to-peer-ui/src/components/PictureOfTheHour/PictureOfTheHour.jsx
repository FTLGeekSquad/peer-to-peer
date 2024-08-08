import React, { useState, useEffect } from "react";
import "./PictureOfTheHour.css";

import antelope from "../../assets/antelope.jpg";
import canyan from "../../assets/canyan.jpg";
import kyoto from "../../assets/kyoto.jpg";
import machu from "../../assets/machu.jpg";
import moraine from "../../assets/moraine.jpg";
import yosemite from "../../assets/yosemite.jpg";
import santorini from "../../assets/santorini.jpg";
import petra from "../../assets/petra.jpg";
import venice from "../../assets/venice.jpg";
import taj from "../../assets/taj.jpg";
import iceland from "../../assets/iceland.jpg";
import brazil from "../../assets/brazil.jpg";
import canada from "../../assets/canada.jpg";
import borabora from "../../assets/borabora.jpg";
import uluru from "../../assets/uluru.jpg";
import capetown from "../../assets/capetown.jpg";
import patagonia from "../../assets/patagonia.jpg";
import italy from "../../assets/italy.jpg";
import bolivia from "../../assets/bolivia.jpg";
import amalfi from "../../assets/amalfi.jpg";
import kruger from "../../assets/kruger.jpg";
import croatia from "../../assets/croatia.jpg";
import zion from "../../assets/zion.jpg";
import grandcanyon from "../../assets/grandcanyon.jpg";

const PictureOfTheHour = () => {
	const images = [
		{
			src: kyoto,
			text: "Kyoto, Japan",
			camera: "Fujifilm X-T4",
		},
		{
			src: machu,
			text: "Machu Picchu, Peru",
			camera: "Sony Alpha 7R IV",
		},
		{
			src: moraine,
			text: "Moraine Lake, Canada",
			camera: "Nikon D850",
		},
		{
			src: yosemite,
			text: "Yosemite, California",
			camera: "NIKON COOLPIX W150",
		},
		{
			src: santorini,
			text: "Santorini, Greece",
			camera: "Canon EOS 5D Mark IV",
		},
		{
			src: petra,
			text: "Petra, Jordan",
			camera: "Canon EOS R5",
		},
		{
			src: venice,
			text: "Venice, Italy",
			camera: "Nikon Z6",
		},
		{
			src: taj,
			text: "Taj Mahal, India",
			camera: "Canon EOS 6D Mark II",
		},
		{
			src: iceland,
			text: "Iceland",
			camera: "Nikon D750",
		},
		{
			src: brazil,
			text: "Rio de Janeiro, Brazil",
			camera: "Sony Alpha 7 II",
		},
		{
			src: canyan,
			text: "Grand Canyon, USA",
			camera: "Canon EOS 90D",
		},
		{
			src: canada,
			text: "Banff National Park, Canada",
			camera: "Nikon D7200",
		},
		{
			src: borabora,
			text: "Bora Bora, French Polynesia",
			camera: "Fujifilm X-T3",
		},
		{
			src: uluru,
			text: "Uluru, Australia",
			camera: "Sony Alpha 7R III",
		},
		{
			src: capetown,
			text: "Cape Town, South Africa",
			camera: "Canon EOS 5DS R",
		},
		{
			src: antelope,
			text: "Antelope Canyon, USA",
			camera: "Nikon Z7",
		},
		{
			src: patagonia,
			text: "Patagonia, Argentina",
			camera: "Sony Alpha 7S II",
		},
		{
			src: italy,
			text: "Cinque Terre, Italy",
			camera: "Canon EOS 80D",
		},
		{
			src: bolivia,
			text: "Salar de Uyuni, Bolivia",
			camera: "Nikon D810",
		},
		{
			src: amalfi,
			text: "Amalfi Coast, Italy",
			camera: "Sony Alpha 7R II",
		},
		{
			src: kruger,
			text: "Kruger National Park, South Africa",
			camera: "Canon EOS 7D Mark II",
		},
		{
			src: croatia,
			text: "Dubrovnik, Croatia",
			camera: "Nikon D5600",
		},
		{
			src: zion,
			text: "Zion National Park, USA",
			camera: "Fujifilm X-T30",
		},
		{
			src: grandcanyon,
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