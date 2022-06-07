import "./App.css";
import SetlistGenerator from "./generate/SetlistGenerator";
import SetList from "./generate/SetList";
import Track from "./generate/Track";
import tracks from "./asset/data/alltracks.json";
import SetlistTable from "./SetlistTable";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4
};

function entropyDesc(entropy: number) {
	let foo: string = "";
	switch (entropy) {
		case 3:
			foo = "Main, Semitone, and Double Semitone";
			break;
		case 2:
			foo = "Main and Semitone";
			break;
		case 1:
			foo = "Main";
			break;
		case 0:
		default:
			foo = "Single Key";
			break;

			return (
				<React.Fragment>
					<span>Tracklist Entropy: {foo}</span> | <a href="https://www.soulglo.com/camelot-wheel">Camelot Wheel</a>
				</React.Fragment>
			);
	}
}

function App() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// @ts-ignore
	let setList: SetList = SetlistGenerator(tracks.tracks);
	const trackList: Track[] = setList.trackList;
	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="md">
				<header>
					<h2>Setlist Generator</h2>
					{/*<span style={{fontSize: "small"}}>(beta)</span>*/}
				</header>
				<section>
					<Typography align="right">
						<span style={{ fontSize: "small" }}>
							Number of Tracks: {trackList.length} | Unmixed Time: {setList.totalDuration} | Tracklist Entropy:{" "}
							{setList.setEntropy}
						</span>
					</Typography>
				</section>
				<Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
					{SetlistTable(setList)}
					<footer>
						<Typography align="center">
							<span style={{ fontSize: "x-small" }}>
								please report bugs here:
								<a href="https://github.com/geeves/setlist-generator">https://github.com/geeves/setlist-generator</a>
							</span>
						</Typography>
					</footer>
				</Box>
			</Container>
			{/*<Modal*/}
			{/*	open={open}*/}
			{/*	onClose={handleClose}*/}
			{/*	aria-labelledby="modal-modal-title"*/}
			{/*	aria-describedby="modal-modal-description"*/}
			{/*>*/}
			{/*	<Box sx={style}>*/}
			{/*		<Typography id="modal-modal-title" variant="h6" component="h2">*/}
			{/*			Text in a modal*/}
			{/*		</Typography>*/}
			{/*		<Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
			{/*			Duis mollis, est non commodo luctus, nisi erat porttitor ligula.*/}
			{/*		</Typography>*/}
			{/*	</Box>*/}
			{/*</Modal>*/}
		</React.Fragment>
	);
}

export default App;
