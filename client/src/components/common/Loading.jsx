import React from 'react';
import {
	Result,
	Empty,
} from 'antd';
import {
	SyncOutlined,
} from '@ant-design/icons';

import { primaryColor } from '../../variables.less';

export const Loader = (props) => {
	const loaderStyle = {
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		height: '100%',
	};
	return (
		<div style={loaderStyle}>
			<SyncOutlined style={{ fontSize: 32, alignSelf: 'center', color: primaryColor }} spin />
		</div>
	);
}

export const LoadingContent = ({ dataFetch, children }) => {
	if (dataFetch.error) {
		return <Result status="error" title="Sorry, something went wrong, try again later" />;
	}

	if (dataFetch.loading) {
		return <Loader />
	}

	return children;
};

export const LoadingList = ({ dataFetch, children, listProp }) => {
	// content is just a placeholder div while list is loading
	// the Spin component in LoadingComponent will display this under the loader
	// might consider just not using the Spin component
	let content = <div />;
	if (dataFetch.result) {
		let hasContent = listProp ? 
			dataFetch.result[listProp].length :
			dataFetch.result.length
		if (hasContent) {
			content = children;
		} else {
			content = <Empty style={{ marginTop: 16 }} description="Nothing Here" />;
		}
	}

	return (
		<LoadingContent dataFetch={dataFetch}>
			{content}
		</LoadingContent>
	);
};
