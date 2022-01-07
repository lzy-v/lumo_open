/**
 * 
 * 
 * @Package: WithPopover
 * @Date   : Dec 25th 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - https://mui.com/components/popover/
 *
 *
*/


import React from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


/**
 *
 * @Use: add pop over to item
 *
 *
 **/
function WithPopover(props){


	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const { Child } = props;


	return (
		<div>
			<Child 
				{...props}
				aria-owns={open ? 'mouse-over-popover' : undefined}
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			/>
			<Popover
				id="mouse-over-popover"
				sx={{
				  pointerEvents: 'none',
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
				  vertical: 'bottom',
				  horizontal: 'left',
				}}
				transformOrigin={{
				  vertical: 'top',
				  horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<Typography sx={{ p: 1 }}> Explain to me what this is </Typography>
			</Popover>
		</div>
	);
}


export default WithPopover
