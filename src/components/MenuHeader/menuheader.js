import React from 'react'
import { useSelector } from 'react-redux'
import './style.css'
/**
* @author
* @function MenuHeader
**/

export const MenuHeader = (props) => {

  const category = useSelector(state => state.category);
  // console.log(category);

  const renderCategoryTree = (categories) => {
    let myCategory = [];
    // console.log(categories)
    for (let category of categories) {
      myCategory.push(
        <li key={category.name}>
          {category.parentId ? <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a>:
          <span>{category.name}</span>}
          {category.children.length > 0 ? <ul>{renderCategoryTree(category.children)}</ul> : null}
        </li>
      );
    }
    // console.log(myCategory);
    return myCategory;
  }
  return (
    <div className='menuheader'>
      <ul>
        {category.categories.length > 0 ? renderCategoryTree(category.categories) : null}
      </ul>
    </div>
  )

}