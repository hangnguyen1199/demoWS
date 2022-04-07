import React from 'react';
import { PropTypes } from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import CustomEditor from '@spo/lib/plugin/ckeditor5/build/ckeditor.js';
import Cookies from 'js-cookie';
import constants from '@spo/config/constants';
import { v4 as uuidv4 } from 'uuid';
/**
 * ****************************************************************************
 * DUNGNT RenderEditor CODE
 * render-editor.js
 *
 * description		:
 * created at		:	2020-10-14
 * created by		:	DungNT
 * package			:	spo\shared\components\redux-form\common\render-editor.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'lineHeight',
        '|',
        'indent',
        'outdent',
        '|',
        'imageUpload',
        // 'blockQuote',
        'insertTable',
        // 'mediaEmbed',
        'undo',
        'redo',
        // 'fontColor',
        'fontSize',
        // 'fontFamily',
        // 'highlight',
        // 'htmlEmbed',
    ],
    language: 'vi',
    image: {
        toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableCellProperties',
            'tableProperties',
        ],
    },
    simpleUpload: {
        // The URL that the images are uploaded to.
        uploadUrl: `${constants.BASE_API_URL}/upload/image/ckeditor`,

        // Enable the XMLHttpRequest.withCredentials property.
        withCredentials: true,

        // Headers sent along with the XMLHttpRequest to the upload server.
        headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: `Bearer ${Cookies.get('token')}`,
            'x-requestid': `${uuidv4()}`,
        },
    },
};
function RenderEditor(props) {
    const {
        readonly,
        autoComplete,
        input,
        placeholder,
        type,
        maxLength,
        meta: { touched, error, submitFailed },
    } = props;
    const showError = submitFailed && touched && error;
    const handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        input.onChange(data);
    };
    return (
        <div
            className={`render-editor position-relative ${
                readonly ? 'readonly' : ''
            }`}>
            <div className="position-relative">
                <CKEditor
                    config={editorConfiguration}
                    data={input.value}
                    editor={CustomEditor}
                    {...input}
                    onChange={handleCkeditorState}
                    onBlur={handleCkeditorState}
                />

                <div
                    className="position-absolute d-end pr-2"
                    style={{
                        bottom: 0,
                        right: 0,
                        width: 80,
                        height: 'fit-content',
                    }}>
                    {maxLength > 0 && (
                        <div className="mt-auto py-2">{`${
                            input.value.length ?? 0
                        } / ${props.maxLength}`}</div>
                    )}
                </div>
            </div>
            <div className={`error-float ${showError ? '' : 'd-none'} `}>
                <div className="wrap _shadow1">
                    <span className="text-error">{error}</span>
                </div>
            </div>
        </div>
    );
}
RenderEditor.propTypes = {
    autoComplete: PropTypes.bool,
    input: PropTypes.object,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    meta: PropTypes.object,
    maxLength: PropTypes.number,
    readonly: PropTypes.bool,
};
RenderEditor.defaultProps = {
    autoComplete: true,
    placeholder: 'Nhập ...',
    type: 'text',
    maxLength: -1,
    readonly: false,
};
export default RenderEditor;
