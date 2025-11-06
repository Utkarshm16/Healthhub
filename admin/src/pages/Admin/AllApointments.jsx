import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from "../../context/AppContext";

const AllApointments = () => {
  const { aToken, cancelAppointment, appointments, getAllAppointments } = useContext(AdminContext)
  const { calculateAge, slotDateFormat } = useContext(AppContext)

   
  useEffect(() => {
     if (aToken )getAllAppointments()
  }, [aToken])

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header - visible on sm and up */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b text-gray-600 font-medium">
          <div>#</div>
          <div>Patient</div>
          <div className="text-center">Age</div>
          <div>Date &amp; Time</div>
          <div>Doctor</div>
          <div className="text-right">Fees</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id ?? index}
            className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center sm:items-center gap-3 sm:gap-0 py-4 px-6 border-b text-gray-700"
          >
            {/* Col 1: index (hidden on xs) */}
            <div className="hidden sm:block text-sm">{index + 1}</div>

            {/* Col 2: avatar + name */}
            <div className="flex items-center gap-3">
              <img
                src={item.userData?.image}
                alt={item.userData?.name || "avatar"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-sm">{item.userData?.name}</div>
                {/* optionally email or small detail */}
                <div className="text-xs text-gray-500">{item.userData?.email}</div>
              </div>
            </div>

            {/* Col 3: age */}
            <div className="hidden sm:block text-center text-sm">
              {calculateAge(item.userData?.dob)}
            </div>

            {/* Col 4: date & time */}
            <div className="text-sm">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </div>

            {/* Col 5: doctor */}
            <div className="text-sm">{ item.docData?.name ?? '-'}</div>

            {/* Col 6: fees */}
            <div className="text-sm text-right">
              {`₹${item.docData?.fees}` ?? '-'}
            </div>

            {/* Col 7: actions */}
            <div className="text-right w-full sm:w-auto">
              <div className="flex justify-end gap-2">
                {/* <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs">View</button> */}
              <button className="px-3 py-1 rounded border text-xs" onClick={()=>cancelAppointment(item._id)}>Cancel</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllApointments
