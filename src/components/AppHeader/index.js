import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export default function AppHeader({ title }) {
  return (
    <div className="app-header">
      <h1>{ title }</h1>
    </div>
  )
}
