/**
 * @Package: ParentageView.jsx
 * @Date   : Dec 24th 2021
 * @Author : Xiao Ling   
 * @Docs:
 *   - https://mui.com/components/transitions/
 *
 *
*/



import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { COLORS } from './constants'
import WithPopover from './WithPopover';

/******************************************************
	@styles
******************************************************/


const useStyles = makeStyles((theme: Theme) => createStyles({

	// container
	container: {
		display: "flex",
		// borderLeft: `0.4px solid ${COLORS.translucent}`
	},


	overLayContainer: {
		display: 'grid',
	},

	overLayContainerInner: {
		gridArea: '1 / 1',
	},	

	// inbound bubble
	messageContainer: {

		position    : "relative",
		marginLeft  : "20px",
		marginBottom: "10px",
		padding     : "10px",
		backgroundColor: COLORS.transparent,

		width    : "100%",
		//height: "50px",
		textAlign: "left",
		color    : 'white',
		borderLeft: `1px solid ${COLORS.translucent}`


	},

	messageContenth1: {
		padding: 0,
		margin: 0,
	    fontFamily: 'NeueMachina-Black',
        fontSize: '15px',	    
        filter: `brightness(0.75)`,
		paddingBottom: theme.spacing(1),
	},

	messageContenth2: {
		padding: 0,
		margin: 0,
		// font: "400 .7em 'monospace', monospace",
	    fontFamily: 'NeueMachina-Regular',		
        fontSize: '14px',	    	    
        filter: `brightness(0.70)`,
		paddingBottom: theme.spacing(1)
	},


}));



/******************************************************
	@views
******************************************************/


/**
 *
 * @Use: base view to render inner leaf
 *
 **/
const ParentageViewLeafBase = (props) => {

	const blurStyle = props.blur_style ?? {};
	const classes = useStyles();

	const Genealogy = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth1} style={blurStyle} {...props}> Genealogy </div> }
		/>		
		)
	}

	const Inspired = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}>  Direct Ancestor: _ </div> }
		/>		
		)
	}	

	const Inspiring = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}> Inspiring: 0x..., 0x... </div> }
		/>		
		)
	}		



	return (
		<div className={classes.container}>
			<div>
				<div className={classes.messageContainer} style={blurStyle}>
					<div>
						<Genealogy {...props}/>
						<Inspired {...props}/>
						<Inspiring {...props}/>
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 *
 * @Use: base view to render orphaneleaf
 *
 **/
const ParentageViewOrphanBase = (props) => {


	const blurStyle = props.blur_style ?? {}
	const classes = useStyles();

	const Genealogy = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth1} style={blurStyle} {...props}> Genealogy </div> }
		/>		
		)
	}

	const Inspired = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}>  Direct Ancestor: _ </div> }
		/>		
		)
	}	

	const Adoption = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}>  Adoption in 23 hours 9 minutes </div> }
		/>		
		)
	}		


	return (
		<div className={classes.container}>
			<div>
				<div className={classes.messageContainer} style={blurStyle}>
					<div>
						<Genealogy {...props}/>
						<Inspired {...props}/>
						<Adoption {...props}/>
					</div>
				</div>
			</div>
		</div>
	);
};



/**
 *
 * @Use: base view to render orphaneleaf
 *
 **/
const ParentageSubmissionViewBase = (props) => {


	const blurStyle = props.blur_style ?? {}
	const classes = useStyles();

	const InspiredBy = (props) => {
		return (
			<WithPopover
				{...props}
				Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}>Inspired by: __</div>}
			/>		
		)
	}

	const Lineage = (props) => {
		return (
			<WithPopover
				{...props}
				Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}> Home room: __</div>}
			/>		
		)
	}	

	return (
		<div className={classes.container}>
			<div>
				<div className={classes.messageContainer} style={blurStyle}>
					<div>
						<div className={classes.messageContenth1} style={blurStyle}>Submission </div> 
						<InspiredBy {...props}/>
						<Lineage {...props}/>
					</div>
				</div>
			</div>
		</div>
	);
};


/**
 *
 * @Use: base view to render orphaneleaf
 *
 **/
const ParenteProfileViewBase = (props) => {


	const blurStyle = props.blur_style ?? {}
	const classes = useStyles();

	const Genealogy = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth1} style={blurStyle} {...props}> Profile </div> }
		/>		
		)
	}

	const Inspired = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}>  Invited by _ </div> }
		/>		
		)
	}	

	const Adoption = (props) => {
		return (
		<WithPopover
			{...props}
			Child={(props) => <div className={classes.messageContenth2} style={blurStyle} {...props}>  23 wrapped tokens </div> }
		/>		
		)
	}		


	return (
		<div className={classes.container}>
			<div>
				<div className={classes.messageContainer} style={blurStyle}>
					<div>
						<Genealogy {...props}/>
						<Inspired {...props}/>
						<Adoption {...props}/>
					</div>
				</div>
			</div>
		</div>
	);
};





/******************************************************
	@exported views
******************************************************/


/**
 * 
 * @Use: Leaf view
 * 
 */ 
const ParentageLeafView = (props) => {

	const classes = useStyles();

	return (
		<>
		<div className={classes.overLayContainer}>
			<div className={classes.overLayContainerInner}>
				<ParentageViewLeafBase {...props} blur_style={{}}/>
			</div>
			<div className={classes.overLayContainerInner}>
				<ParentageViewLeafBase {...props} blur_style={{filter:'blur(12px)'}}/>				
			</div>
		</div>
		</>
	);
};

/**
 * 
 * @Use: orphan view
 * 
 */ 
const ParentageOrphanView = (props) => {

	const classes = useStyles();

	return (
		<>
		<div className={classes.overLayContainer}>
			<div className={classes.overLayContainerInner}>
				<ParentageViewOrphanBase {...props} blur_style={{}}/>
			</div>
			<div className={classes.overLayContainerInner}>
				<ParentageViewOrphanBase {...props} blur_style={{filter:'blur(12px)'}}/>				
			</div>
		</div>
		</>
	);
};


/**
 * 
 * @Use: orphan view
 * 
 */ 
const ParentageSubmissionView = (props) => {

	const classes = useStyles();

	return (
		<>
		<div className={classes.overLayContainer}>
			<div className={classes.overLayContainerInner}>
				<ParentageSubmissionViewBase {...props} blur_style={{}}/>
			</div>
			<div className={classes.overLayContainerInner}>
				<ParentageSubmissionViewBase {...props} blur_style={{filter:'blur(12px)'}}/>				
			</div>
		</div>
		</>
	);
};

/**
 * 
 * @Use: profile view
 * 
 */ 
const ParenteProfileView = (props) => {

	const classes = useStyles();

	return (
		<>
		<div className={classes.overLayContainer}>
			<div className={classes.overLayContainerInner}>
				<ParenteProfileViewBase {...props} blur_style={{}}/>
			</div>
			<div className={classes.overLayContainerInner}>
				<ParenteProfileViewBase {...props} blur_style={{filter:'blur(12px)'}}/>				
			</div>
		</div>
		</>
	);
};



export { ParentageLeafView, ParentageOrphanView, ParentageSubmissionView, ParenteProfileView }











