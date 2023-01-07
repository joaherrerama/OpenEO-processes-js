<template>
    <div>
        <canvas :id="id" ></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default({
    props:['id', 'labels', 'data'],
    components:{
        Chart
    },
    setup() {
        
    },
    data(){
        return {
        }
    },
    mounted() {
        setTimeout(()=>{
            console.log(this.id)
            this.creategraph();
        },1000)
    },
    methods: {
        creategraph(){
            const ctx = document.getElementById(this.id);
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: 'time',
                        data: this.data,
                        fill: false,
                        borderColor: '#a75534',
                        tension: 0.5
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: false
                    }
                    }
                }
            });
        }
    },
})
</script>