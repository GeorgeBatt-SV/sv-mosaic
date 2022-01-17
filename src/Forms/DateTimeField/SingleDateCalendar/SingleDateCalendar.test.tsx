import { render } from '@testing-library/react';
import * as React from 'react';
import SingleDateCalendar from '../SingleDateCalendar';

describe('SingleDateCalendar component', () => {
	it('should should display the date value', () => {
		const { getByText } = render(
			<SingleDateCalendar
				fieldDef={{
					label: '',
					disabled: true,
				}}
				value={new Date('2018-01-01T00:00:00.000Z')}
				onChange={() => jest.fn()}
			/>
		);

		expect(getByText('1/1/2018')).toBeTruthy();
	});

	it('should display the placeholder when is disabled and no value is provided', () => {
		const { getByText } = render(
			<SingleDateCalendar
				fieldDef={{
					label: '',
					disabled: true,
				}}
				value={null}
				onChange={() => jest.fn()}
			/>
		);

		expect(getByText('MM / DD / YYYY')).toBeTruthy();
	})
});
