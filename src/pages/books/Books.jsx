import React, { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { BookContext } from '../../context/bookContext/BookContext';
import ListedReadList from '../../components/ListedBooks/ListedReadList';
import ListedWishList from '../../components/ListedBooks/ListedWishList';

const Books = () => {
  const { handelMarkAsRead, storedBooks, wishlist } = useContext(BookContext)
  return (
    <div className='container mx-auto my-5'>
      <Tabs>
        <TabList>
          <Tab>Read List Books</Tab>
          <Tab>Wishlist Books</Tab>
        </TabList>

        <TabPanel>
          <ListedReadList></ListedReadList>
        </TabPanel>
        <TabPanel>
          <ListedWishList></ListedWishList>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Books;