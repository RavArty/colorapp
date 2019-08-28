import React from 'react';
import { shallow, mount } from 'enzyme';
import { App }  from './App';


describe('App component', () => {

  const mockProps = {
    currentUser: { uid: '123'}
  }

  let wrapper = shallow(<App {...mockProps}/>)

  describe('check user in db', () => {
    it('should return 204, user not in db', () => {
      const mockData = {
        id: '1',
        data: 'data'
      }
   
      const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            status: 204
        })
      }))
      // return checkUserInDB(mockData.id, mockData.data).then(data => {
      //   expect(mockFetch.mock.calls.length).toBe(1);
      //   // expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
      //   // expect(data.count).toEqual(87);
      //   // expect(data.results.length).toBeGreaterThan(5);
      // })
     // expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/checkuser')
   expect(wrapper.instance().checkUserInDB(mockData.id, mockData.data)).toBe()
    
    })
  })
})