import SubHeader from '@/components/layout/sub.header'
import React from 'react'
import FaqAccordion from './faq'

type Props = {}

const page = (props: Props) => {
  return (
    <>
        <SubHeader content='FAQ' />
        <FaqAccordion />
    </>
  )
}

export default page