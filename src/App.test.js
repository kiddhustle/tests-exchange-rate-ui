import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import 'jest-enzyme';
import rates from '../public/api/ratesTest.json';
import App from './App';

configure({
    adapter: new Adapter()
});

global.fetch = () => Promise.resolve({
    json: () => Promise.resolve(rates)
});

// based on https://blog.pragmatists.com/genuine-guide-to-testing-react-redux-applications-6f3265c11f63
const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

export const flushRequestsAndUpdate = async enzymeWrapper => {
    await flushAllPromises()
    enzymeWrapper.update();
}

it('renders without crashing', () => {
    mount(<App />);
});

it('renders loading text initially', async () => {
    const app = mount(<App />);
    expect(app.find('div')).toHaveText('Loading...');
});

it('renders a table after data load', async () => {
    const app = mount(<App />);
    expect(app.find('div')).toHaveText('Loading...');
    await flushRequestsAndUpdate(app);
    expect(app.find('table')).toExist();
});

it('renders rows with currency name as key', async () => {
    const app = mount( <App /> );
    await flushRequestsAndUpdate(app);

    expect(app.find('table tbody tr').at(0).key()).toEqual('AED');
    expect(app.find('table tbody tr').at(1).key()).toEqual('AFN');
});

it('renders columns with currency name concatenated with column index as key', async () => {
    const app = mount(<App />);
    await flushRequestsAndUpdate(app);

    expect(app.find('table tbody tr').at(0).childAt(0).key()).toEqual('AED0');
    expect(app.find('table tbody tr').at(0).childAt(1).key()).toEqual('AED1');
});

it('renders table that is initially sorted by currency ascending', async () => {
    const app = mount(<App />);
    await flushRequestsAndUpdate(app);
    expect(app.find('table')).toMatchSnapshot();
});

it('can sort first column descending', async () => {
    const app = mount(<App />);
    await flushRequestsAndUpdate(app);
    app.find('table thead tr th').at(0).simulate('click');
    expect(app.find('table')).toMatchSnapshot();
});

it('can sort by second column ascending', async () => {
    const app = mount( <App /> );
    await flushRequestsAndUpdate(app);
    app.find('table thead tr th').at(1).simulate('click');
    expect(app.find('table')).toMatchSnapshot();
});

it('can sort by second column descending', async () => {
    const app = mount(<App />);
    await flushRequestsAndUpdate(app);
    app.find('table thead tr th').at(1).simulate('click');
    app.find('table thead tr th').at(1).simulate('click');
    expect(app.find('table')).toMatchSnapshot();
});