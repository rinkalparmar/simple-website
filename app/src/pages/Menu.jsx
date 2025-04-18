import React, { useState } from 'react';
import { MenuList } from '../component/MenuList';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

function Menu() {
    const [addItem, setAddItem] = useState(0);
    const addOrder = () => {
        setAddItem(addItem + 1);
        localStorage.setItem("orderCount", JSON.stringify(addItem + 1));
    };



    console.log("addItem", addItem);
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
                                    <Button variant='success' onClick={addOrder}>Order</Button>
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