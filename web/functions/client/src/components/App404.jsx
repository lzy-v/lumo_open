/**
 *
 * @Package: App404.jsx
 * @Date   : Dec 29th, 2021
 * @Author : Xiao Ling   
 *
*/


import React from 'react'
import { CubeTableWithImage } from './CubeTable';
import AppBodyTemplate from './AppBodyTemplate';
import img from './../assets/404-1.gif'



/**
 *
 * @Use: one fungible token view
 * 
 *
 **/
export default function App404(props){
	return (
		<AppBodyTemplate
			{...props}
			centerLeft
			RightSideView  = {() => <></>}
			LeftBottomView = {() => <></>}						
			TopLeftView = {() => <></>}
			LeftCenterView = {() => <CubeTableWithImage imgSrc={img}  {...props}/>}
		/>
	)   
}