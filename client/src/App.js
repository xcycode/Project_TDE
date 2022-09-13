import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';

import Missing from './components/Missing';
import OrderR from './pages/restaurant/OrderR';
import Layout from './components/Layout';
import HomeR from './pages/restaurant/HomeR';
import Unauthorized from './components/Unauthorized';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Storelist from './pages/user/Storelist';
import Dishlist from './pages/user/Dishlist';
import Cart from './pages/user/Cart';
import DishlistR from './pages/restaurant/DishlistR';
import OrderD from './pages/delivery/OrderD';
import Deliver from './pages/delivery/Deliver';
import MapPage from './pages/delivery/MapPage';

import Finished from './pages/delivery/Finished';
import Wait from './pages/user/Wait';


import LPSuccess from './pages/user/LinePaySuccess'
import LPFailed from './pages/user/LinePayFailed'
import LPProcess from './pages/user/LinePayProcess'
import LPConfirm from './pages/user/LinePayConfirm'
import Test from './pages/user/Test'
import ECPay from './pages/user/ECPay';
import Analysis from './pages/restaurant/Analysis';

import Chat from './components/Chat';
import Login from './components/Login';
import Register from './components/Register';
import RegisterR from './components/RegisterR';
import ECSend from './pages/user/ECSend';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route path="/" element={<Login />} />

				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="registerR" element={<RegisterR />} />
				
				<Route path="unauthorize" element={<Unauthorized />} />
				<Route path="up" element={<Upload />} />


				{/* -----------------------使用者 Route--------------------- */}
				<Route path="userpage" element={<Storelist />} />
				<Route path="Profile" element={<Profile />} />
				<Route path="Cart" element={<Cart />} />
				<Route path="Wait" element={<Wait />} />
				<Route path="dish" element={<Dishlist />}>
					<Route path=":resname" element={<Dishlist />} />
				</Route>
				<Route path='LPSuccess' element={<LPSuccess/>}/>
				<Route path='LPFailed' element={<LPFailed/>}/>
				<Route path='LPConfirm' element={<LPConfirm />}>
					<Route path=':transaction' element={<LPConfirm />} />
				</Route>
				<Route path='LPProcess' element={<LPProcess />} />
				<Route path='Test' element={<Test />} />
				<Route path='ECPay' element = {<ECPay />} />
				<Route path='ECSend' element = {<ECSend />} />
				{/* ------------------------------------------------------- */}

				{/* ------------------------店家 Route---------------------- */}
				<Route path="respage" element={<HomeR />} />
				<Route path="Profile" element={<Profile />} />
				<Route path="order" element={<OrderR />} />
				<Route path="edit" element={<DishlistR />} />
				<Route path="analysis" element={<Analysis />} />
				{/* ------------------------------------------------------- */}

				{/* -----------------------外送員 Route--------------------- */}
				<Route path="deliverypage" element={<OrderD />} />
				<Route path="orderdetail" element={<Deliver />} />
				<Route path="map" element={<MapPage />} />
				<Route path="chat" element={<Chat />} />
				<Route path="finished" element={<Finished />} />
				{/* ------------------------------------------------------- */}

				{/* RequireAuth驗證是否登入 */}
				<Route element={<RequireAuth />}>
					<Route path="userpage" element={<Storelist />} />
					<Route path="Profile" element={<Profile />} />
					<Route path="dish" element={<Dishlist />}>
						<Route path=":resname" element={<Dishlist />} />
					</Route>
					<Route path="Cart" element={<Cart />} />
				</Route>

				<Route element={<RequireAuth />}>
					<Route path="respage" element={<HomeR />} />
					<Route path="Profile" element={<Profile />} />
					<Route path="order" element={<OrderR />} />
					<Route path="edit" element={<DishlistR />}>
						<Route path=":storename" element={<DishlistR />} />
					</Route>
				</Route>

				{/* catch all */}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}


export default App
