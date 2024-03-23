import React, { useState, useEffect } from "react";
import { Box, Input, Button, Text, VStack, HStack, IconButton, Spacer, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const toast = useToast();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      toast({
        title: "Please enter a todo",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, { text: todo, completed: false }]);
    setTodo("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <Box maxWidth="600px" margin="auto" p={4}>
      <Header />
      <form onSubmit={handleSubmit}>
        <HStack>
          <Input placeholder="Enter a todo" value={todo} onChange={(e) => setTodo(e.target.value)} />
          <Button type="submit" colorScheme="blue" px={8}>
            <FaPlus />
          </Button>
        </HStack>
      </form>
      <HStack spacing={4} mt={8}>
        <Button onClick={() => setFilter("all")} variant={filter === "all" ? "solid" : "ghost"}>
          All
        </Button>
        <Button onClick={() => setFilter("active")} variant={filter === "active" ? "solid" : "ghost"}>
          Active
        </Button>
        <Button onClick={() => setFilter("completed")} variant={filter === "completed" ? "solid" : "ghost"}>
          Completed
        </Button>
        <Spacer />
        <Text>
          {activeCount} active, {completedCount} completed
        </Text>
        <Button onClick={clearCompleted} colorScheme="red">
          Clear Completed
        </Button>
      </HStack>
      <VStack spacing={4} mt={8} align="stretch">
        {filteredTodos.map((todo, index) => (
          <HStack key={index} onClick={() => toggleComplete(index)} cursor="pointer" bg={todo.completed ? "green.100" : "white"} p={2} borderRadius="md">
            <Text textDecoration={todo.completed ? "line-through" : "none"}>{todo.text}</Text>
            <Spacer />
            {todo.completed && <FaCheck color="green" />}
            <IconButton
              icon={<FaTrash />}
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(index);
              }}
              colorScheme="red"
              size="sm"
            />
          </HStack>
        ))}
      </VStack>
      <Footer />
    </Box>
  );
};

export default Index;
