import React from 'react'

const ListItem = ({ item }) => {
  const date = new Date(item[0])
  return (
    <p>
      {item[1].toFixed(2)}€
      {' '}
      {date.toISOString().split('T')[0]}
    </p>
  )
}

export default ListItem
