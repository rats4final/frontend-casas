"use client"
import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import { ScrollArea } from '@/components/ui/scroll-area';

// Datos de muestra
const personas = [
  { id: 1, nombre: 'Juan Pérez' },
  { id: 2, nombre: 'María González' },
  { id: 3, nombre: 'Pedro Ramírez' },
];

const propietarios = [
  { id: 1, nombre: 'Ana Rodríguez' },
  { id: 2, nombre: 'Carlos López' },
  { id: 3, nombre: 'Sofía Martínez' },
];

const propiedades = [
  { id: 1, direccion: 'Calle Principal 123, Santa Cruz' },
  { id: 2, direccion: 'Avenida Secundaria 456, La Paz' },
  { id: 3, direccion: 'Calle Terciaria 789, Cochabamba' },
];

const tw = createTw({});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
    textDecoration: 'underline',
  },
});

const contenidoContrato = `Santa Cruz, ${new Date().toLocaleDateString()}
CONTRATO DE ALQUILER
Conste por el presente documento privado de contrato de ALQUILER, que el
mismo a solo reconocimiento de firmas y rúbricas entre partes suscribientes se
podrá elevar a documento público; el mismo que es suscrito bajo las siguientes
cláusulas:
PRIMERA. - (PROPIETARIA) Yo; [NOMBRE_PROPIETARIO] con
C.I. [CI_PROPIETARIO], mayor de edad y hábil por derecho, boliviana, al presente
declaro ser legítima propietaria del inmueble ubicado en la [DIRECCION_PROPIEDAD],
inmueble que está debidamente registrado en la Oficina de Derechos
Reales.
SEGUNDA. - (OBJETO), Al presente, por convenir a mis intereses, de mi libre y
espontanea voluntad, DOY, en contrato de alquiler inmueble señalado en la
cláusula primera, con servicio energía eléctrica y agua potable, a favor de los
señores: [NOMBRE_INQUILINO] con C.I. [CI_INQUILINO], por acuerdo de partes el canon del
alquiler es por la suma de Bs. 1800.- (MIL OCHOCIENTOS 00/700
BOLIVIANOS) mensual. Asimismo, declaro recibir la suma de Bs. 1800.- como
garantía del cumplimiento del contrato, misma que será devuelto a la
finalización del contrato.
... (el resto del contenido del contrato)
`;

export default function ContractPage() {
  const [inquilino, setInquilino] = useState(null);
  const [propietario, setPropietario] = useState(null);
  const [propiedad, setPropiedad] = useState(null);
  const [generarPDF, setGenerarPDF] = useState(false);

  const handleGenerarPDF = () => {
    setGenerarPDF(true);
  };

  return (
    <ScrollArea className="h-screen p-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Generar Contrato de Alquiler</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seleccione un inquilino</label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={inquilino ? inquilino.id : ''}
            onChange={(e) => setInquilino(personas.find((p) => p.id === parseInt(e.target.value)))}
          >
            <option value="">Seleccione un inquilino</option>
            {personas.map((persona) => (
              <option key={persona.id} value={persona.id}>
                {persona.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seleccione un propietario</label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={propietario ? propietario.id : ''}
            onChange={(e) => setPropietario(propietarios.find((p) => p.id === parseInt(e.target.value)))}
          >
            <option value="">Seleccione un propietario</option>
            {propietarios.map((propietario) => (
              <option key={propietario.id} value={propietario.id}>
                {propietario.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seleccione una propiedad</label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={propiedad ? propiedad.id : ''}
            onChange={(e) => setPropiedad(propiedades.find((p) => p.id === parseInt(e.target.value)))}
          >
            <option value="">Seleccione una propiedad</option>
            {propiedades.map((propiedad) => (
              <option key={propiedad.id} value={propiedad.id}>
                {propiedad.direccion}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerarPDF}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generar PDF
        </button>

        {generarPDF && inquilino && propietario && propiedad && (
          <div className="mt-8">
            <PDFViewer className="w-full h-96" showToolbar>
              <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.section}>
                    <Text style={styles.header}>CONTRATO DE ALQUILER</Text>
                    <Text style={styles.text}>
                      {contenidoContrato
                        .replace('[NOMBRE_PROPIETARIO]', propietario.nombre)
                        .replace('[CI_PROPIETARIO]', '1234567') // Aquí debes reemplazar por el CI del propietario
                        .replace('[DIRECCION_PROPIEDAD]', propiedad.direccion)
                        .replace('[NOMBRE_INQUILINO]', inquilino.nombre)
                        .replace('[CI_INQUILINO]', '7654321')} 
                    </Text>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
