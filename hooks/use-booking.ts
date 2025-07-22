// "use client";

// import { useQuery, useMutation } from "@tanstack/react-query";
// import { format } from "date-fns";
// import {
//   generateTimeSlots,
//   getAvailableTherapists,
//   getServiceById,
//   getTherapistById,
//   type Service,
//   type Therapist,
//   type TimeSlot,
// } from "@/lib/mock-data";

// interface BookingData {
//   selectedDate?: Date;
//   selectedService?: string;
//   selectedTherapist?: string;
//   availableSlots: TimeSlot[];
//   availableTherapists: Therapist[];
//   isLoading: boolean;
//   error: Error | null;
// }

// interface BookingActions {
//   onServiceChange: (serviceId: string) => void;
//   onDateChange: (date: Date | undefined) => void;
//   onTherapistChange: (therapistId: string) => void;
//   submitBooking: (formData: any) => Promise<void>;
// }

// export function useBooking(): [BookingData, BookingActions] {
//   const { data: services }: any = useQuery({
//     queryKey: ["services"],
//     queryFn: async () => {
//       // In a real app, this would be an API call
//       return Promise.resolve(services);
//     },
//   });

//   const { data: availableSlots = [], refetch: refetchSlots } = useQuery({
//     queryKey: ["timeSlots", selectedDate],
//     queryFn: async () => {
//       if (!selectedDate) return [];
//       return generateTimeSlots(selectedDate);
//     },
//     enabled: !!selectedDate,
//   });

//   const { data: availableTherapists = [], refetch: refetchTherapists } =
//     useQuery({
//       queryKey: ["therapists", selectedService, selectedDate],
//       queryFn: async () => {
//         if (!selectedDate || !selectedService) return [];
//         return getAvailableTherapists(selectedDate, selectedService);
//       },
//       enabled: !!selectedDate && !!selectedService,
//     });

//   const bookingMutation = useMutation({
//     mutationFn: async (formData: any) => {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       const service = getServiceById(formData.serviceType);
//       const therapist = getTherapistById(formData.therapistId);

//       return {
//         success: true,
//         message: `Your ${service?.name} appointment with ${
//           therapist?.name
//         } has been scheduled for ${format(formData.date, "MMMM do, yyyy")} at ${
//           formData.timeSlot
//         }.`,
//       };
//     },
//   });

//   const onServiceChange = (serviceId: string) => {
//     setSelectedService(serviceId);
//     refetchTherapists();
//   };

//   const onDateChange = (date: Date | undefined) => {
//     setSelectedDate(date);
//     refetchSlots();
//     if (selectedService) {
//       refetchTherapists();
//     }
//   };

//   const onTherapistChange = (therapistId: string) => {
//     setSelectedTherapist(therapistId);
//   };

//   const submitBooking = async (formData: any) => {
//     await bookingMutation.mutateAsync(formData);
//   };

//   return [
//     {
//       selectedDate,
//       selectedService,
//       selectedTherapist,
//       availableSlots,
//       availableTherapists,
//       isLoading: bookingMutation.isPending,
//       error: bookingMutation.error,
//     },
//     {
//       onServiceChange,
//       onDateChange,
//       onTherapistChange,
//       submitBooking,
//     },
//   ];
// }
