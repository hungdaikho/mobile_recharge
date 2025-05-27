import SubHeader from '@/components/layout/sub.header'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <>
            <SubHeader content="News" />
            <div className="max-w-7xl mx-auto p-6 my-10 mt-[-100px] text-gray-800 border rounded-lg shadow bg-white">
                {/* Nội dung tin tức sẽ được thêm tại đây */}
            </div>
        </>
    )
}

export default page