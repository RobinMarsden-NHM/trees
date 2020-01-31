//  This file should eventually be dynamically created by webpack
//  For now just ensure that any 'more info' components belonging to questions are imported and exported here

import LeafArrangement from './questions/leaf-arrangement/MoreInfo'
import LeafType from './questions/leaf-type/MoreInfo'

export default [
  { id: 'leaf-type', component: LeafType },
  { id: 'leaf-arrangement', component: LeafArrangement }
]
