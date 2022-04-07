import React, { useEffect , useState } from 'react';
import Order from '../../../components/cart/order';
import { useSelector } from 'react-redux';



export default function RightSide(props) {
    const { loading, data } = useSelector((state) => state.Cart);
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let _total = data.checkedCart.reduce(
            (sum, item) => {
                let index = data.cartProducts.findIndex(x=>x.ProductId == item.ProductId && x.ColorId == item?.ColorId && x.SizeId == item?.SizeId )
                if(index != -1){
                    sum += data.cartProducts[index]?.Quantity *  data.cartProducts[index]?.MinPrice
                }
                return sum;
            },
            0,
        );
        setTotal(_total)  
    },[data.checkedCart, data.cartProducts])
    return (
        <div className="right-side">
            <Order total={total} checkedCart={data.checkedCart} errorNoItem={props.errorNoItem} setErrorNoItem={props.setErrorNoItem} carts={data.cartProducts}/>
        </div>
    );
}
