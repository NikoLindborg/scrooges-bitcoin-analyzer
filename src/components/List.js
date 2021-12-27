import React from 'react'
import ListItem from './ListItem'

const List = ({ list }) => {
  return (
    <ul>
      {list.map((e, i) => (
        <ListItem key={i} item={e} />
      ))}
    </ul>
  )
}

export default List
