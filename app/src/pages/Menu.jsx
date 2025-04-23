import React, { useState, useContext } from 'react';
import { MenuList } from '../component/MenuList';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Context from '../redux/Context';


function Menu() {

	const checkUser = JSON.parse(localStorage.getItem("isAuthenticate"));
	const errorMsg = () => {
		alert("login first");
	};

	const { setGetCount, updateCount } = useContext(Context);//@@@@@@@

	const addToCart = (item) => {//@@@@@@@
		const logindata = JSON.parse(localStorage.getItem("logindata"));
		const userEmail = logindata?.email;
		if (!userEmail) return;

		let userOrders = JSON.parse(localStorage.getItem(`orders_${userEmail}`)) || [];
		userOrders.push(item);
		// console.log("object", userOrders);
		localStorage.setItem(`orders_${userEmail}`, JSON.stringify(userOrders));
		setGetCount(userOrders);//displya total count of items
		updateCount();
	};

	return (
		<>
			<h1 className='text-center' style={{ marginTop: "40px" }}>MenuList</h1>

			<div className="row" style={{ margin: "30px" }}>
				{
					MenuList.map((item, index) => {
						return <div className="col-sm-4" key={index}>
							<Card style={{ width: '18rem', margin: "4px" }}>
								<Card.Img src={item.image} style={{ height: "250px" }} />
								<Card.Body>
									<Card.Title>{item.name}</Card.Title>
									<Card.Text>
										{item.description}
									</Card.Text>
									{
										checkUser ?
											<Button variant='success' onClick={() => addToCart(item)}>Order</Button>
											:
											<Button variant='success' onClick={errorMsg}>Order</Button>
									}

								</Card.Body>
							</Card>
						</div>;
					})
				}
			</div>;
		</>
	);
}

export default Menu;