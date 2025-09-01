**Kata de Programación: Sistema de Seguimiento de Préstamos Bancarios con Pagos Anticipados**

**Contexto:**
Eres desarrollador en un banco que ofrece préstamos personales con dos sistemas de amortización: **método francés** (cuotas constantes) y **método alemán** (amortización constante). El sistema debe permitir pagos anticipados con diferentes estrategias.

**Descripción del Problema:**
Implementa un sistema que genere y haga seguimiento a un préstamo, mostrando el detalle de cada cuota y permitiendo pagos anticipados que puedan either **reducir el número de cuotas** o **mantener el plazo reduciendo el monto de las cuotas**.

**Requisitos:**

1. **Datos de Entrada:**
    - Monto del préstamo (capital inicial)
    - Tasa de interés anual (en porcentaje)
    - Plazo en meses
    - Tipo de amortización: "francés" o "alemán"

2. **Cálculos por Método:**

   **Método Francés:**
    - Cuota constante mensual
    - Fórmula: `Cuota = Capital * (i / (1 - (1 + i)^(-n)))`
    - Donde `i = tasa mensual = (tasa anual/100)/12`

   **Método Alemán:**
    - Amortización constante: `Amortización = Capital / n`
    - Intereses decrecientes: `Intereses = Saldo * i`
    - Cuota variable: `Cuota = Amortización + Intereses`

3. **Tabla de Amortización:**
   Para cada mes mostrar:
    - Número de cuota
    - Saldo inicial
    - Monto de la cuota
    - Intereses pagados
    - Amortización al capital
    - Saldo restante

4. **Sistema de Pagos Anticipados:**
    - Permitir abonos extra en cualquier cuota
    - Ofrecer dos opciones después de un pago anticipado:
      a) **Mantener plazo**: Reducir el monto de las cuotas siguientes
      b) **Achicar cuotas**: Mantener el monto de la cuota y reducir el número de pagos restantes

5. **Estadísticas Finales:**
    - Total de intereses pagados
    - Total pagado (capital + intereses)
    - Número total de cuotas pagadas (incluyendo pagos anticipados)
    - Ahorro en intereses por pagos anticipados

**Ejemplo de Flujo:**

```
Monto: 10000
Tasa anual: 12%
Plazo: 12 meses
Método: francés

Cuota 1: Pago normal de 888.49
Cuota 2: Pago normal + abono extra de 2000

¿Qué desea hacer con el abono extra?
1. Mantener plazo (reducir cuotas siguientes)
2. Achicar cuotas (reducir número de pagos)

Opción seleccionada: 1

// El sistema recalcula las cuotas restantes con el nuevo saldo
```

**Retos Adicionales:**
- Simular diferentes escenarios de pagos anticipados
- Calcular el ahorro en intereses de cada estrategia
- Permitir pagos anticipados parciales y totales
- Generar reportes comparativos entre estrategias
- Interfaz para visualizar el impacto de los pagos anticipados

