import SubHeader from '@/components/layout/sub.header'
import React from 'react'
import RechargeGuide from './recharge_guid'

type Props = {}

const page = (props: Props) => {
  return (
    <>
        <SubHeader content="How to Recharge & Pay" />
        <RechargeGuide />
    </>
  )
}

export default page