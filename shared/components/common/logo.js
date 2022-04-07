import React from 'react';
import { Link } from '@spo/routes';
import Image from '@spo/components/common/image'

export default function Logo (props) {
    return (
        <Link href="/">
            <div className="d-flex flex-column">
                {!props.type && (
                    <Image style={{ height: 42 }} src="/images/icon/logo_fm.png" />
                )}
                {props.type == 2 && (
                    <Image style={{ height: 42 }} src="/images/icon/logo_fm.png" />
                )}
                {props.type == 3 && (
                    <Image style={{ height: 42 }} src="/images/icon/logo_fm_2.svg" />
                )}
            </div>
        </Link>
    );
}
