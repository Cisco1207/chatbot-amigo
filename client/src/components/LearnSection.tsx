import LearnCard from "./LearnCard";

export default function LearnSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">Aprende sobre el Bullying</h2>
        <p>Conocer los diferentes tipos de bullying y cómo identificarlos es el primer paso para combatirlo.</p>
      </div>
      
      <div className="space-y-6">
        <LearnCard 
          title="¿Qué es el bullying?" 
          borderColor="border-primary"
          content={
            <>
              <p className="text-sm text-foreground mb-3">El bullying o acoso escolar es un comportamiento agresivo que implica un desequilibrio de poder y que se repite, o tiene el potencial de repetirse, con el tiempo.</p>
              
              <div className="bg-background p-3 rounded-lg mt-3">
                <h4 className="font-medium mb-2">El bullying puede incluir:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  <li>Hacer amenazas</li>
                  <li>Propagar rumores</li>
                  <li>Atacar física o verbalmente a alguien</li>
                  <li>Excluir a alguien de un grupo a propósito</li>
                  <li>Enviar mensajes dañinos por internet o redes sociales</li>
                </ul>
              </div>
            </>
          }
        />
        
        <LearnCard 
          title="Tipos de bullying" 
          borderColor="border-secondary"
          content={
            <div className="space-y-4 mt-2">
              <div>
                <h4 className="font-medium text-primary">Bullying verbal</h4>
                <p className="text-sm">Incluye insultos, burlas, amenazas y humillaciones verbales.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary">Bullying físico</h4>
                <p className="text-sm">Incluye golpes, empujones, patadas, pellizcos o cualquier forma de agresión física.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary">Bullying social</h4>
                <p className="text-sm">Incluye exclusión deliberada, difusión de rumores o manipulación de amistades.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-primary">Cyberbullying</h4>
                <p className="text-sm">Ocurre a través de dispositivos digitales como teléfonos, computadoras y tablets, utilizando SMS, mensajes directos, aplicaciones o foros online.</p>
              </div>
            </div>
          }
        />
        
        <LearnCard 
          title="Señales de alerta" 
          borderColor="border-accent"
          content={
            <>
              <p className="text-sm text-foreground mb-3">Es importante reconocer las señales de que alguien puede estar sufriendo bullying:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <div className="bg-background p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Señales físicas</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Ropa, libros u otras pertenencias dañadas</li>
                    <li>Heridas o moretones inexplicables</li>
                    <li>Dolores de cabeza o estómago frecuentes</li>
                    <li>Cambios en los hábitos alimenticios</li>
                  </ul>
                </div>
                
                <div className="bg-background p-3 rounded-lg">
                  <h4 className="font-medium mb-1">Señales emocionales</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Pérdida de interés en la escuela</li>
                    <li>Disminución en las calificaciones</li>
                    <li>No querer ir a la escuela</li>
                    <li>Aislamiento o pérdida de amigos</li>
                    <li>Cambios de humor, tristeza o irritabilidad</li>
                  </ul>
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}
