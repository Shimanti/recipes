import React from 'react'
import style from './recipe.module.css'

const Recipe = ({title,serves,ingredients,directions}) => {
  return (
    <div className={style.recipe}>
      <h2>{title}</h2>
      <h4>{serves}</h4>
      <ul>
        {ingredients.map(i=>(
          <li>{i}</li>
        ))}
      </ul>
      <p>{directions}</p>
    </div>
  )
}

export default Recipe
