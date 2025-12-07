import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  User, 
  CheckCircle, 
  UserRound, 
  AlertCircle 
} from 'lucide-react';
import Calendar from './components/Calendar';
import { PROFESSIONALS, TIME_SLOTS } from './constants';
import { Professional, Appointment } from './types';

const App: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  
  // Persistent State (Simulating backend)
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Reset time selection when date changes to prevent invalid states
  useEffect(() => {
    setSelectedTime(null);
  }, [selectedDate, selectedProfessional]);

  // Helpers
  const formatDateTitle = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatWeekDay = (date: Date) => {
    const str = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getDayAndMonth = (date: Date) => {
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '')
    };
  };

  // Logic to check availability
  const isSlotBooked = (time: string) => {
    if (!selectedProfessional) return false;
    
    // Normalize date to YYYY-MM-DD for comparison
    const dateKey = selectedDate.toISOString().split('T')[0];
    
    return appointments.some(appt => 
      appt.dateStr === dateKey && 
      appt.time === time && 
      appt.professionalId === selectedProfessional.id
    );
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime || !selectedProfessional) return;

    const dateKey = selectedDate.toISOString().split('T')[0];
    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      dateStr: dateKey,
      time: selectedTime,
      professionalId: selectedProfessional.id
    };

    setAppointments([...appointments, newAppointment]);
    
    // UI Feedback
    alert(`✅ Agendamento Confirmado!\n\n📅 ${formatDateTitle(selectedDate)}\n⏰ ${selectedTime}\n👨‍⚕️ ${selectedProfessional.name}`);
    
    // Reset selection
    setSelectedTime(null);
    setSelectedProfessional(null);
  };

  const { day, month } = getDayAndMonth(selectedDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-4">
             <CalendarCheck className="w-8 h-8 text-primary mr-2" />
             <span className="font-bold text-primary text-xl">MedSchedule</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-3">
            Agendar Consulta
          </h1>
          <p className="text-gray-500 text-lg">
            Escolha a data, horário e profissional ideal para você
          </p>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 items-start">
          
          {/* Left Column: Calendar */}
          <div className="lg:sticky lg:top-8">
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
            />
          </div>

          {/* Right Column: Scheduling Details */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-500 ease-in-out">
            
            {/* Date Header */}
            <div className="flex items-center gap-6 border-b-2 border-slate-100 pb-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-3xl font-bold leading-none">{day}</span>
                <span className="text-xs font-bold tracking-wider mt-1">{month}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary">
                  {formatDateTitle(selectedDate)}
                </h2>
                <p className="text-gray-500 font-medium text-lg mt-1">
                  {formatWeekDay(selectedDate)}
                </p>
              </div>
            </div>

            {/* Step 1: Select Professional */}
            <div className="mb-10 animate-fade-in-up">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <UserRound className="w-5 h-5 text-accent" />
                Selecione o Profissional
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROFESSIONALS.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => setSelectedProfessional(prof)}
                    className={`
                      relative flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300 text-left group
                      ${selectedProfessional?.id === prof.id 
                        ? 'border-primary bg-primary text-white shadow-lg scale-[1.02]' 
                        : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                      }
                    `}
                  >
                    <div className={`
                      w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2
                      ${selectedProfessional?.id === prof.id ? 'border-white/30' : 'border-slate-100'}
                    `}>
                      <img src={prof.avatarUrl} alt={prof.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold truncate ${selectedProfessional?.id === prof.id ? 'text-white' : 'text-primary'}`}>
                        {prof.name}
                      </div>
                      <div className={`text-xs truncate ${selectedProfessional?.id === prof.id ? 'text-blue-200' : 'text-gray-400'}`}>
                        {prof.specialty}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Time */}
            <div className={`mb-10 transition-opacity duration-500 ${!selectedProfessional ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                Horários Disponíveis
                {!selectedProfessional && <span className="text-xs font-normal text-gray-400 ml-auto">(Selecione um médico primeiro)</span>}
              </h3>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {TIME_SLOTS.map((slot) => {
                  const isBooked = isSlotBooked(slot.time);
                  const isSelected = selectedTime === slot.time;

                  return (
                    <button
                      key={slot.time}
                      disabled={isBooked}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`
                        py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative
                        ${isBooked 
                          ? 'bg-slate-100 text-gray-300 cursor-not-allowed decoration-slice line-through' 
                          : isSelected
                            ? 'bg-primary text-white shadow-md ring-2 ring-primary ring-offset-2'
                            : 'bg-white border-2 border-slate-100 text-gray-600 hover:border-primary hover:text-primary'
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
              {selectedProfessional && TIME_SLOTS.every(slot => isSlotBooked(slot.time)) && (
                <div className="mt-4 p-4 bg-orange-50 text-orange-600 rounded-xl flex items-center gap-2 text-sm">
                  <AlertCircle size={16} />
                  Sem horários disponíveis para este profissional nesta data.
                </div>
              )}
            </div>

            {/* Summary & Action */}
            {selectedDate && selectedTime && selectedProfessional && (
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 animate-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Resumo do Agendamento
                </h3>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Profissional</p>
                      <p className="text-primary font-bold">{selectedProfessional.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <CalendarCheck size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Data</p>
                      <p className="text-primary font-bold">
                        {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold">Horário</p>
                      <p className="text-primary font-bold">{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleConfirm}
                  className="w-full bg-gradient-to-r from-primary to-primary-light text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle className="w-6 h-6" />
                  Confirmar Agendamento
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
