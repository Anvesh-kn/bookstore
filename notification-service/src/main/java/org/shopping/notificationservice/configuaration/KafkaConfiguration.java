package org.shopping.notificationservice.configuaration;

import jakarta.annotation.PostConstruct;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.shopping.notificationservice.domain.ApplicationProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.*;
import org.springframework.kafka.support.converter.JsonMessageConverter;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableConfigurationProperties(ApplicationProperties.class)
public class KafkaConfiguration {

    @Value("${spring.kafka.bootstrap-servers}")
    private String kafkaBootstrapServers;

    @PostConstruct
    public void init() {
        System.out.println("Resolved Kafka Bootstrap Servers: " + kafkaBootstrapServers);
    }

    private final ApplicationProperties applicationProperties;

    public KafkaConfiguration(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> configProps = new HashMap<>();
        configProps.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBootstrapServers);
        configProps.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configProps.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
        return new DefaultKafkaProducerFactory<>(configProps);
//        return new DefaultKafkaProducerFactory<>(new HashMap<>());
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
/*
    @Bean
    public ConsumerFactory<String, Object> consumerFactory(KafkaProperties kafkaProperties) {
      *//* Map<String, Object> configProps = new HashMap<>();
        System.out.println("anvesh_kafka)");
        System.out.println("anvesh_kafka)" + kafkaBootstrapServers);
        configProps.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBootstrapServers);
        configProps.put(ConsumerConfig.GROUP_ID_CONFIG, "order-service");
        configProps.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        configProps.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        configProps.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class);
        configProps.put(JsonDeserializer.TRUSTED_PACKAGES, "org.shopping.orderservice.domain.models,org.shopping.notificationservice.domain.models");
        System.out.println("Trusted packages: " + configProps.get(JsonDeserializer.TRUSTED_PACKAGES));
        return new DefaultKafkaConsumerFactory<>(configProps);*//*
        Map<String, Object> configProps = new HashMap<>(kafkaProperties.buildConsumerProperties());
        System.out.println("Consumer Factory Config: " + configProps);
        return new DefaultKafkaConsumerFactory<>(configProps);
    }*/

    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "order-service-group");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, ErrorHandlingDeserializer.class);
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS, JsonDeserializer.class.getName());
        props.put(JsonDeserializer.TRUSTED_PACKAGES, "org.shopping.orderservice.domain.models,org.shopping.notificationservice.domain.models");
        props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, Map.class.getName());
        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory(ConsumerFactory<String, Object> consumerFactory) {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        return factory;

    }

    @Bean
    public NewTopic orderEventsTopic() {
        return new NewTopic(applicationProperties.orderEventsTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic newOrdersTopic() {
        return new NewTopic(applicationProperties.newOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic deliveredOrdersTopic() {
        return new NewTopic(applicationProperties.deliveredOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic cancelledOrdersTopic() {
        return new NewTopic(applicationProperties.cancelledOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public NewTopic errorOrdersTopic() {
        return new NewTopic(applicationProperties.errorOrdersTopic(), 2, (short) 1);
    }

    @Bean
    public JsonMessageConverter jsonMessageConverter() {
        return new JsonMessageConverter();
    }
}
