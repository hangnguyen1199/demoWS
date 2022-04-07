import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Actions from '../../redux/help-center/action';

const KeywordSearchContainer = dynamic(() =>
    import('@spo/containers/help-center/keyword-search'),
);

const KeywordSearch = ({ data }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: Actions.GET_FAQ_RESPONSE,
            payload: data,
        });
    }, []);

    return <KeywordSearchContainer />;
};

KeywordSearch.Layout = SpoLayout;

export async function getServerSideProps(ctx) {
    const data = await axios
        .get(`${process.env.API_URL}/master/faq`)
        .then((res) => res.data)
        .catch((err) => {
            return {};
        });
    return {
        props: {
            data,
        },
    };
}

export default KeywordSearch;
