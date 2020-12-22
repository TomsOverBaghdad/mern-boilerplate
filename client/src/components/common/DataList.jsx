import React from 'react';
import {
	Form,
	Input,
	Typography,
} from 'antd';

const { Text } = Typography;


/**
 * A nice way to display information in minimal space
 * @return {table}
 */
const DataList = (props) => (
	<table>
		<tbody>
			{props.children}
		</tbody>
	</table>
);

/**
 * This is a row in the Data List, it has a display component and a component
 * for when the data is being edited. You can use this strictly as a view as well
 * @param  {String} props.title: This is displayed as the left column; the label.
 * @param  {String|Array} props.name: The object path for the Form.Item see ant
 *                                      design docs for more info here. Usually,
 *                                      This will be the property name of the object
 *                                      we're making the form for
 * @param  {String|Component} props.value: How to display the value, if null
 *                                       the default is '-'
 * @param  {DataItem.DataFormItem} props.valueForm: Can be null if value is a string, otherwise
 *                                        this should be a DataItem.DataFormItem. This is required
 *                                        to be passed if the value is not a string and you're
 *                                        attempting to edit.
 * @param  {String} props.isEditing: If the form is being edited
 * @param  {String} props.copyable: For the default text, set copyable
 * @return {<tr>} returns the row element
 */
const DataItem = ({ title, name, value, valueForm, isEditing, copyable }) => {
	if (!title) {
		throw new Error('Must include title with DataItem');
	}
	let useDefaultValue = !value || typeof value === "string";

	let valueComponent = value;
	if (isEditing) {
		if (!useDefaultValue && !valueForm) {
			throw new Error(`Must include valueForm if attempting to edit DataItem '${title}'`);
		}
		if (useDefaultValue && !valueForm) {
			if (!name) {
				throw new Error(`Must include name if using default form to edit DataItem '${title}'`);
			}
			valueComponent = (
				<DataFormItem name={name}>
					<Input />
				</DataFormItem>
			);
		} else {
			valueComponent = valueForm;
		}
	} else if (!isEditing && useDefaultValue) {
		valueComponent = <Text copyable={copyable}>{value || '-'}</Text>;
	}

	return (
		<tr style={{ height: 34 }}>
			<td style={{ textAlign: 'right', paddingRight: 16, whiteSpace: 'nowrap' }}>
				<Text type="secondary">{title}</Text>
			</td>
			<td style={{ width: '100%' }}>{valueComponent}</td>
		</tr>
	);
};

/**
 * FormItem for DataList. Accepts all the props the Form.Item accepts
 * should probably have have name and initialValue
 * @param  {Object} props
 * @return {Form.Item}
 */
const DataFormItem = (props) => (
	<Form.Item {...props} style={{ marginBottom: 0, width: '100%' }}>
		{props.children || <Input />}
	</Form.Item>
);

DataList.DataItem = DataItem;
DataList.DataFormItem = DataFormItem;
export { DataList };
