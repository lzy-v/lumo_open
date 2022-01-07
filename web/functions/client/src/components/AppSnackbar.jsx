/**
 * @Package: AppSnackbar.jsx
 * @Date   : 1/3/2022
 * @Author : Xiao Ling   
 *
 *
*/


import React from "react";
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { COLORS } from './constants';
import burn_img from './../assets/burn1.jpeg';



const snackBarStyle = {
    color: 'white',
    fontFamily: 'NeueMachina-Bold',
    fontSize: '12px',        
    background: COLORS.red_1,
    backgroundImage: `url(${burn_img})`,        
}



export default function AppSnackbar(props) {

    const { vertical, horizontal, showSnack, snackMessage } = props;
    
    return (
        <Snackbar
            anchorOrigin={{ vertical: vertical, horizontal:horizontal }}
            open={showSnack && snackMessage !== ""}
            onClose={() => {return}}
            key={'snack'}
        >            
          <SnackbarContent 
            style={snackBarStyle}
            message={<span id="client-snackbar"> {snackMessage ?? ""} </span>}
          />            
        </Snackbar>
    )


}




