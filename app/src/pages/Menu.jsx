import React, { useEffect, useState } from 'react';
// import { MenuList } from '../component/MenuList';	
import { MenuList } from "../staticData/MenuList";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { updateCount } from '../store/cartSlice';


function Menu() {
	const dispatch = useDispatch();
	const [quantities, setQuantities] = useState({});

	// debugger;
	const increament = (id) => {
		setQuantities((preQ) => {
			const currentQ = preQ[id] || 1; //bydefual setQuantities now {} so set 1 then add by 1
			return { ...preQ, [id]: Math.min(currentQ + 1, 30) };
		});
	};

	const decreament = (id) => {
		setQuantities(preQ => {
			const currentQ = preQ[id] || 1;
			return { ...preQ, [id]: Math.max(currentQ - 1, 1) };
		});
	};



	const checkUser = JSON.parse(localStorage.getItem("isAuthenticate"));
	const errorMsg = () => {
		alert("login first");
	};

	useEffect(() => {
		dispatch(updateCount());
	}, [dispatch]);


	const addToCart = (item) => {
		const quantity = quantities[item.id] || 1;
		const itemQty = { ...item, quantity, totalPrice: item.price * quantity };
		dispatch(addItem(itemQty));
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
										{item.price}
									</Card.Text>
									{
										checkUser ?
											<>
												<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
													<FaMinus onClick={() => decreament(item.id)} style={{ cursor: 'pointer' }} />
													<p style={{ margin: '0' }}>{quantities[item.id] || 1}</p>
													<FaPlus onClick={() => increament(item.id)} style={{ cursor: 'pointer' }} />
												</div>
												<Button variant='success' onClick={() => addToCart(item)} className='mx-2'>Order</Button>

											</>
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
};

export default Menu;

/**
 * import React, { useContext } from 'react';
import { MenuList } from '../component/MenuList';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Context from '../redux/Context';



function Menu() {

	const checkUser = JSON.parse(localStorage.getItem("isAuthenticate"));
	const errorMsg = () => {
		alert("login first");
	};

	const { countDisplay } = useContext(Context);//@@@@@@@

	const addToCart = (item) => {//@@@@@@@
		const loginData = JSON.parse(localStorage.getItem("loginData")) || {};
		const userId = loginData?.id;
		console.log("userId", userId);

		if (!userId) {
			return;
		}

		const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
		console.log("cartData", cartData);

		const userfind = cartData.find((u) => u.userId === userId);
		console.log("userfind", userfind);

		if (userfind) {
			userfind.items.push(item);
		}
		else {
			cartData.push({ userId: userId, items: [item] });
		}

		localStorage.setItem("cartData", JSON.stringify(cartData));

		countDisplay();

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
										{item.price}
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
};

export default Menu;
 */