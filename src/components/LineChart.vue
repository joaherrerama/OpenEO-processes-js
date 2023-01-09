<template>
    <div>
        <canvas :id="id" ></canvas>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default({
    props:['id', 'labels', 'data', 'dataM'],
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
                        label: 'time (ms)',
                        data: this.data,
                        fill: false,
                        borderColor: 'black',
                        tension: 0.5,
                        yAxisID: 'y'
                    },{
                        label: 'memory (mega-bytes)',
                        data: this.dataM,
                        fill: false,
                        borderColor: 'orange',
                        tension: 0.5,
                        yAxisID: 'y1',
                    }]
                },
                options: {
                    scales: {
                    y: {
                        beginAtZero: false,
                        position: 'left',
                    },
                    y1: {
                        beginAtZero: false,
                        position: 'right',
                    }
                    }
                }
            });
        }
    },
})
</script>