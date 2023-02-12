import React from "react";
import { useHistory } from "react-router-dom";
import '../css/notes.css'

function NoteCard(props) {
	const history = useHistory()
	return (
		<div className="card" onClick={()=>history.push("/notes/"+(props.id))}>
			<div className="head">NoteCard</div>
			<div className="card-show">
				{" "}
				sque felis imperdiet
				proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
				tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
				varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
				Lorem donec massa sapien faucibus et molestie ac.
            </div>
            <div></div>
		</div>
	);
}

export default NoteCard;