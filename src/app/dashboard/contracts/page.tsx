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
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const contenidoContrato = `Santa Cruz, ${new Date()}
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
    <ScrollArea className="h-screen">
      <div>
        <select
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

      <div>
        <select
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

      <div>
        <select
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

      <button onClick={handleGenerarPDF}>Generar PDF</button>

      {generarPDF && inquilino && propietario && propiedad && (
        <PDFViewer className='w-full h-screen' showToolbar>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>
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
      )}
    </ScrollArea>
  );
};
