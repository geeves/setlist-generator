import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SetList from "./generate/SetList";
import Track from "./generate/Track";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0
	}
}));

export default function SetlistTable(setList: SetList) {
	const trackList: Track[] = setList.trackList;
	return (
		<TableContainer component={Paper}>
			<Table stickyHeader sx={{ minWidth: 750, maxHeight: 800 }} aria-label="simple table">
				<TableHead>
					<StyledTableRow>
						<StyledTableCell>Artist</StyledTableCell>
						<StyledTableCell>Title</StyledTableCell>
						<StyledTableCell>Remixer</StyledTableCell>
						<StyledTableCell>Label</StyledTableCell>
						<StyledTableCell>Key</StyledTableCell>
						<StyledTableCell>BPM</StyledTableCell>
						<StyledTableCell>Time</StyledTableCell>
					</StyledTableRow>
				</TableHead>
				<TableBody>
					{trackList.map((t) => (
						<StyledTableRow key={t.id}>
							<StyledTableCell component="th" scope="t">
								{t.artist}
							</StyledTableCell>
							<StyledTableCell>{t.title}</StyledTableCell>
							<StyledTableCell>{t.remixer}</StyledTableCell>
							<StyledTableCell>{t.label}</StyledTableCell>
							<StyledTableCell>{t.key}</StyledTableCell>
							<StyledTableCell>{t.bpm}</StyledTableCell>
							<StyledTableCell>{t.duration}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
