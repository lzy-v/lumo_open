/**
 * @Package: withSnac hoc
 * @Date   : 1/2/2022
 * @Author : Xiao Ling   
 *
 *
*/

import React, { Component } from 'react'
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import LinearProgress from '@mui/material/LinearProgress';
import burn_img from './../assets/burn1.jpeg';

import { COLORS } from './../components/constants';

const snackBarStyle = {
    background: COLORS.red_1,
    color: 'white',
    fontFamily: 'NeueMachina-Bold',
    fontSize: '12px',        
    backgroundImage: `url(${burn_img})`,        
}



export default function withSnack(WrappedComponent){


	return class extends Component {

		state =  {
			showSnack: false,
			snackMessage: "",
			showProgress: false, 
		}

		/**
		 *
		 * @Use: set snackbar message
		 *
		 **/
		showSnack = (msg) => {
			this.setState({ showSnack: true, snackMessage: msg ?? "" })
		}

		toggleProgresss = () => {
			this.setState({ showProgress: !this.state.showProgress })
		}


		/******************************************************
			@View
		******************************************************/

		render(){
			return (
				<>
					<WrappedComponent
						{...this.props}
						_hoc_show_snack = {this.showSnack}
						_hoc_toggle_progress = {this.toggleProgresss}
					/>
	                {/* progress bar*/}
	                { this.state.showProgress ? <LinearProgress color="error" /> : <></> }

	                {/* error messge toast*/}
	                <Snackbar
	                    anchorOrigin={{ vertical: 'top', horizontal:'middle' }}
	                    open={this.state.showSnackbar && this.state.snackMessage !== ""}
	                    key={'snack'}
	                >            
	                    <SnackbarContent 
	                        style={snackBarStyle}
	                        message={<span id="client-snackbar"> {this.state.snackMessage ?? ""} </span>}
	                    />            
	                </Snackbar>				
				</>
			);
		} 
	}



};

